import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: { exercises: true },
    });
    return NextResponse.json(workouts);
  } catch (error) {
    console.error("Get workouts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const { title, description, date, duration, caloriesBurned, exercises } =
      await req.json();

    const workout = await prisma.workout.create({
      data: {
        title,
        description,
        date: new Date(date),
        duration,
        caloriesBurned,
        userId,
        exercises: {
          create: exercises,
        },
      },
      include: { exercises: true },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    console.error("Create workout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
