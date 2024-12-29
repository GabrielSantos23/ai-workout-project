"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateForumPostModal } from "@/components/create-forum-post-modal";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  timestamp: string;
  replies: number;
  likes: number;
}

const sampleForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Best protein powder for muscle gain?",
    content:
      "I'm looking for recommendations on the best protein powder for muscle gain. What brands do you prefer and why?",
    author: {
      name: "John Doe",
      image: "/placeholder-avatar.jpg",
    },
    timestamp: "2 hours ago",
    replies: 5,
    likes: 10,
  },
  {
    id: "2",
    title: "How to improve running form?",
    content:
      "I've been running for a few months now, but I feel like my form could use some work. Any tips or resources for improving running technique?",
    author: {
      name: "Jane Smith",
      image: "/placeholder-avatar.jpg",
    },
    timestamp: "1 day ago",
    replies: 8,
    likes: 15,
  },
];

export default function ForumPage() {
  const [forumPosts, setForumPosts] = useState(sampleForumPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredPosts = forumPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addForumPost = (
    newPost: Omit<ForumPost, "id" | "replies" | "likes">
  ) => {
    setForumPosts([
      {
        ...newPost,
        id: Date.now().toString(),
        replies: 0,
        likes: 0,
      },
      ...forumPosts,
    ]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fitness Forum</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create New Post
        </Button>
      </div>
      <Card className="mb-8">
        <CardContent className="p-4">
          <Input
            placeholder="Search forum posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.timestamp}
                  </p>
                </div>
              </div>
              <p className="mb-4">{post.content}</p>
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    👍 Like ({post.likes})
                  </Button>
                  <Button variant="outline" size="sm">
                    💬 Reply ({post.replies})
                  </Button>
                </div>
                <Button variant="link" size="sm">
                  View Full Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CreateForumPostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={addForumPost}
      />
    </div>
  );
}
