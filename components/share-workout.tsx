"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ShareWorkout() {
  const [content, setContent] = useState("");
  const [hasCardio, setHasCardio] = useState(false);

  const handleShare = () => {
    console.log("Sharing workout:", { content, hasCardio });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder="Share your workout details..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="bodyPart">Body Part</Label>
            <Select>
              <SelectTrigger id="bodyPart">
                <SelectValue placeholder="Select body part" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chest">Chest</SelectItem>
                <SelectItem value="back">Back</SelectItem>
                <SelectItem value="legs">Legs</SelectItem>
                <SelectItem value="shoulders">Shoulders</SelectItem>
                <SelectItem value="arms">Arms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="intensity">Intensity</Label>
            <Select>
              <SelectTrigger id="intensity">
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter duration"
              min="1"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="calories">Calories Burned</Label>
            <Input
              id="calories"
              type="number"
              placeholder="Enter calories"
              min="0"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="cardio"
            checked={hasCardio}
            onCheckedChange={setHasCardio}
          />
          <Label htmlFor="cardio">Include cardio</Label>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleShare} disabled={!content}>
          Share Workout
        </Button>
      </CardFooter>
    </Card>
  );
}
