"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Clock,
  Dumbbell,
  Flame,
  Target,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface WorkoutStats {
  duration: string;
  bodyPart: string;
  exercises: number;
  calories: number;
  intensity: "Low" | "Medium" | "High";
  hasCardio: boolean;
}

interface WorkoutPostProps {
  author: {
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  workoutStats: WorkoutStats;
}

export function WorkoutPost({
  author,
  content,
  timestamp,
  likes,
  comments,
  workoutStats,
}: WorkoutPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.image} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{author.name}</p>
            <p className="text-sm text-muted-foreground">{timestamp}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Save Workout</DropdownMenuItem>
            <DropdownMenuItem>Copy Workout</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{content}</p>
        <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Duration: {workoutStats.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {workoutStats.bodyPart} - {workoutStats.exercises} exercises
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {workoutStats.calories} calories burned
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Intensity: {workoutStats.intensity}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{workoutStats.bodyPart}</Badge>
          {workoutStats.hasCardio && <Badge variant="secondary">Cardio</Badge>}
          <Badge
            variant={`${
              workoutStats.intensity === "High" ? "destructive" : "secondary"
            }`}
          >
            {workoutStats.intensity} Intensity
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <Heart
              className={`mr-2 h-4 w-4 ${
                isLiked ? "fill-current text-red-500" : ""
              }`}
            />
            {likeCount}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
      {showComments && (
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-sm">
                  Great workout! What's your rest time between sets?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
              <Input placeholder="Write a comment..." />
              <Button size="sm">Post</Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
