import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, UserMinus } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  image: string;
  mutualFriends: number;
}

const sampleFriends: Friend[] = [
  {
    id: "1",
    name: "Alice Johnson",
    image: "/placeholder-avatar.jpg",
    mutualFriends: 5,
  },
  {
    id: "2",
    name: "Bob Smith",
    image: "/placeholder-avatar.jpg",
    mutualFriends: 3,
  },
  {
    id: "3",
    name: "Carol Williams",
    image: "/placeholder-avatar.jpg",
    mutualFriends: 7,
  },
];

export function FriendsList() {
  const [friends, setFriends] = useState(sampleFriends);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeFriend = (id: string) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredFriends.map((friend) => (
        <Card key={friend.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={friend.image} alt={friend.name} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{friend.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {friend.mutualFriends} mutual friends
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeFriend(friend.id)}
              >
                <UserMinus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
