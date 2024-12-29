"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
  image: string;
}

const sampleUsers: User[] = [
  { id: "1", name: "Alice Johnson", image: "/placeholder-avatar.jpg" },
  { id: "2", name: "Bob Smith", image: "/placeholder-avatar.jpg" },
  { id: "3", name: "Carol Williams", image: "/placeholder-avatar.jpg" },
];

const sampleMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    receiverId: "current",
    content: "Hey, how's your workout going?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    senderId: "current",
    receiverId: "1",
    content: "Great! Just finished a 5k run. You?",
    timestamp: "10:35 AM",
  },
  {
    id: "3",
    senderId: "1",
    receiverId: "current",
    content: "Nice! I'm about to start my yoga session.",
    timestamp: "10:37 AM",
  },
];

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "current",
        receiverId: selectedUser.id,
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <div className="grid grid-cols-3 gap-8">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4">Conversations</h2>
            <ScrollArea className="h-[600px]">
              {sampleUsers.map((user) => (
                <div key={user.id} className="mb-4">
                  <button
                    className="flex items-center space-x-4 w-full text-left hover:bg-accent rounded-lg p-2"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last message preview...
                      </p>
                    </div>
                  </button>
                  <Separator className="my-2" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="p-4">
            {selectedUser ? (
              <>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={selectedUser.image}
                      alt={selectedUser.name}
                    />
                    <AvatarFallback>
                      {selectedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold">{selectedUser.name}</h2>
                </div>
                <ScrollArea className="h-[500px] mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.senderId === "current"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block p-2 rounded-lg ${
                          message.senderId === "current"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                Select a conversation to start messaging
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
