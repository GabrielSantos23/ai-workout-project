import { NextResponse } from "next/server";

// In a real application, you would use a database to store and retrieve workouts
let workouts: any[] = [];

export async function GET() {
  return NextResponse.json(workouts);
}

export async function POST(req: Request) {
  const workout = await req.json();
  workout.id = Date.now().toString();
  workouts.push(workout);
  return NextResponse.json(workout);
}

export async function PUT(req: Request) {
  const updatedWorkout = await req.json();
  workouts = workouts.map((w) =>
    w.id === updatedWorkout.id ? updatedWorkout : w
  );
  return NextResponse.json(updatedWorkout);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  workouts = workouts.filter((w) => w.id !== id);
  return NextResponse.json({ message: "Workout deleted" });
}
