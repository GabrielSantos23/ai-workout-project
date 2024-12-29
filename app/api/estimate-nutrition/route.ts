import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { foodName } = await req.json();

    const prompt = `
      As a nutrition expert AI, please estimate the nutritional content for the following food item:

      ${foodName}

      Provide an estimate for:
      1. Calories
      2. Protein (in grams)
      3. Carbohydrates (in grams)
      4. Fat (in grams)

      Please return the response as a JSON object with keys: calories, protein, carbs, fat.
      Use reasonable estimates based on a typical serving size and ONLY respond with a json without any word outside the json.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 256,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("AI response is empty");
    }

    const nutritionEstimate = JSON.parse(responseContent);

    return NextResponse.json(nutritionEstimate);
  } catch (error) {
    console.error("Error estimating nutrition:", error);

    return NextResponse.json(
      {
        error: "Failed to estimate nutrition",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
