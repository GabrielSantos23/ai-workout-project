import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/email";

export async function POST(req: Request) {
  try {
    const { email, workoutTitle, date, time } = await req.json();

    // Verificação básica dos campos recebidos
    if (!email || !workoutTitle || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subject = "Workout Reminder";
    const text = `Don't forget your scheduled workout: ${workoutTitle} on ${date} at ${time}`;

    await sendEmail(email, subject, text);
    return NextResponse.json({ message: "Reminder sent successfully" });
  } catch (error) {
    console.error("Failed to process request:", error);
    return NextResponse.json(
      { error: "Failed to send reminder" },
      { status: 500 }
    );
  }
}
