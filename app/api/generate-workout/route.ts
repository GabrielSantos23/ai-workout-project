import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const exerciseDbApiKey = process.env.EXERCISEDB_API_KEY;

async function fetchExercises(bodyPart: string) {
  const response = await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
    {
      headers: {
        "X-RapidAPI-Key": exerciseDbApiKey!,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch exercises");
  }

  return response.json();
}

export async function POST(req: Request) {
  try {
    const { bodyPart, age, goal, availableTime, fitnessLevel, injury } =
      await req.json();

    const exercises = await fetchExercises(bodyPart);

    const prompt = `
      You are a professional fitness trainer. Create a workout plan in strict JSON format based on the following information:
      
      Body Part: ${bodyPart}
      Age: ${age}
      Goal: ${goal}
      Available Time: ${availableTime} minutes
      Fitness Level: ${fitnessLevel}
      Injury: ${injury || "None"}

      Choose 4-5 exercises from the provided list below. Ensure the response is strictly in JSON format and nothing else. 
      If specifying a range (e.g., reps or sets), use a string format like "8-12" instead of numeric ranges.

      Exercise List:
      ${JSON.stringify(exercises)}

      Example response format:
      {
        "warmup": "Description of warm-up exercises",
        "exercises": [
          {
            "name": "Exercise Name",
            "description": "Brief description of the exercise",
            "sets": number,
            "reps": "string format like '8-12'",
            "gifUrl": "URL of the exercise gif from the exercise list"
          }
        ]
      }
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
    });

    const responseContent = completion.choices[0]?.message?.content;

    // Log original AI response
    console.log("Original AI Response:", responseContent);

    if (!responseContent) {
      throw new Error("AI response is empty");
    }

    // Sanitize JSON response
    let sanitizedResponse = responseContent.replace(
      /"reps":\s*([\d]+)-([\d]+)/g,
      '"reps": "$1-$2"'
    );

    // Log sanitized AI response
    console.log("Sanitized AI Response:", sanitizedResponse);

    let workoutPlan;

    try {
      workoutPlan = JSON.parse(sanitizedResponse);
    } catch (err) {
      console.error(
        "Failed to parse sanitized AI response:",
        sanitizedResponse
      );
      throw new Error("Invalid JSON format in sanitized AI response");
    }

    return NextResponse.json(workoutPlan);
  } catch (error) {
    console.error("Error generating workout:", error);

    return NextResponse.json(
      {
        error: "Failed to generate workout",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
