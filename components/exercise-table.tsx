import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  name: string;
  exercises: number;
  sets: string;
  reps: string;
  weight: string;
  status: "complete" | "in-progress";
}

interface ExerciseTableProps {
  exercises: Exercise[];
}

export function ExerciseTable({ exercises }: ExerciseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Set</TableHead>
          <TableHead>Reps</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises.map((exercise) => (
          <TableRow key={exercise.name}>
            <TableCell>
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">
                  {exercise.exercises} Exercise
                </p>
              </div>
            </TableCell>
            <TableCell>{exercise.sets}</TableCell>
            <TableCell>{exercise.reps}</TableCell>
            <TableCell>{exercise.weight}</TableCell>
            <TableCell>
              <Badge
                variant={
                  exercise.status === "complete" ? "default" : "secondary"
                }
              >
                {exercise.status === "complete" ? "Complete" : "In Progress"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
