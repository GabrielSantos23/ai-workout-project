import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { meals, nutritionGoals } = await req.json();

    const prompt = `
      As a nutrition expert AI, analyze the following meal data and nutrition goals:

      Meals consumed today:
      ${JSON.stringify(meals, null, 2)}

      Nutrition goals:
      ${JSON.stringify(nutritionGoals, null, 2)}

      Please provide a JSON response with the following structure:
      {
        "analysis": "A brief analysis of the user's current nutritional intake compared to their goals.",
        "recommendations": [
          "First specific, actionable recommendation to improve their nutrition.",
          "Second specific, actionable recommendation to improve their nutrition."
        ],
        "suggestedMeal": "A suggestion for a healthy meal that would complement their current intake."
      }

      Ensure your response is a valid JSON object and contains only the specified fields.
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
    let sanitizedResponse = responseContent
      .replace(/(\r\n|\n|\r)/gm, "")
      .replace(/\s+/g, " ")
      .trim();

    // Attempt to extract JSON from the response if it's not a valid JSON string
    const jsonMatch = sanitizedResponse.match(/\{.*\}/);
    if (jsonMatch) {
      sanitizedResponse = jsonMatch[0];
    }

    // Log sanitized AI response
    console.log("Sanitized AI Response:", sanitizedResponse);

    let aiInsights;

    try {
      aiInsights = JSON.parse(sanitizedResponse);
    } catch (err) {
      console.error(
        "Failed to parse sanitized AI response:",
        sanitizedResponse
      );
      throw new Error("Invalid JSON format in sanitized AI response");
    }

    // Validate the structure of the parsed JSON
    if (
      !aiInsights.analysis ||
      !Array.isArray(aiInsights.recommendations) ||
      !aiInsights.suggestedMeal
    ) {
      throw new Error("Invalid AI response structure");
    }

    return NextResponse.json(aiInsights);
  } catch (error) {
    console.error("Error generating nutrition insights:", error);

    return NextResponse.json(
      {
        error: "Failed to generate nutrition insights",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
