"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const workoutScheduleSchema = z.object({
  title: z.string().min(2, {
    message: "Workout title must be at least 2 characters.",
  }),
  type: z.string(),
  date: z.date(),
  time: z.string(),
  duration: z.number().min(1, {
    message: "Duration must be at least 1 minute.",
  }),
  recurring: z.boolean(),
  frequency: z.string().optional(),
});

type WorkoutScheduleFormValues = z.infer<typeof workoutScheduleSchema>;

interface WorkoutScheduleFormProps {
  onClose: () => void;
  date?: Date;
}

export function WorkoutScheduleForm({
  onClose,
  date,
}: WorkoutScheduleFormProps) {
  const [isRecurring, setIsRecurring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm<WorkoutScheduleFormValues>({
    resolver: zodResolver(workoutScheduleSchema),
    defaultValues: {
      title: "",
      type: "strength",
      date: date || new Date(),
      time: "09:00",
      duration: 60,
      recurring: false,
      frequency: "weekly",
    },
  });

  async function onSubmit(values: WorkoutScheduleFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule workout");
      }

      const data = await response.json();
      toast({
        title: "Workout Scheduled",
        description: "Your workout has been successfully scheduled.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem scheduling your workout.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Form fields remain the same */}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Scheduling..." : "Schedule Workout"}
        </Button>
      </CardFooter>
    </Card>
  );
}
