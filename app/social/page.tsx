"use client";

import { useState } from "react";
import { CreatePostCard } from "@/components/create-post-card";
import { WorkoutPost } from "@/components/workout-post";
import { FriendsList } from "@/components/friends-list";
import { FriendSuggestions } from "@/components/friend-suggestions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const samplePosts = [
  {
    author: {
      name: "Jane Smith",
      image: "/placeholder-avatar.jpg",
    },
    content:
      "Just crushed an intense chest day! Really feeling those decline bench presses. Who else is working on their upper body today? 💪",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    workoutStats: {
      duration: "1h 15m",
      bodyPart: "Chest",
      exercises: 5,
      calories: 450,
      intensity: "High" as const,
    },
  },
  {
    author: {
      name: "Mike Johnson",
      image: "/placeholder-avatar.jpg",
    },
    content:
      "Leg day complete! Focus was on form today with lighter weights. Remember: quality over quantity! 🏋️‍♂️",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 8,
    workoutStats: {
      duration: "1h 30m",
      bodyPart: "Legs",
      exercises: 6,
      calories: 600,
      intensity: "Medium" as const,
    },
  },
];

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <div className="space-y-8">
            <CreatePostCard />
            {samplePosts.map((post, index) => (
              <WorkoutPost key={index} {...post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="friends">
          <FriendsList />
        </TabsContent>
        <TabsContent value="discover">
          <FriendSuggestions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
