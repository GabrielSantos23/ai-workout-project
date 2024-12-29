import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { nutritionGoals, userGoal } = await req.json();

    const prompt = `
      As a nutrition expert AI, suggest a meal based on the following information:

      User's goal: ${userGoal}
      Daily nutrition goals:
      ${JSON.stringify(nutritionGoals, null, 2)}

      Please provide a JSON response with the following structure:
      {
        "suggestedMeal": "A description of a meal that aligns with the user's goals and nutritional needs."
      }

      Ensure your response is a valid JSON object and contains only the specified field. Reply ONLY with a json file
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
      max_tokens: 256,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("AI response is empty");
    }

    let mealSuggestion;

    try {
      mealSuggestion = JSON.parse(responseContent);
    } catch (err) {
      console.error("Failed to parse AI response:", responseContent);
      throw new Error("Invalid JSON format in AI response");
    }

    return NextResponse.json(mealSuggestion);
  } catch (error) {
    console.error("Error generating meal suggestion:", error);

    return NextResponse.json(
      {
        error: "Failed to generate meal suggestion",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
