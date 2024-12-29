import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

interface SuggestedFriend {
  id: string;
  name: string;
  image: string;
  mutualFriends: number;
}

const sampleSuggestions: SuggestedFriend[] = [
  {
    id: "1",
    name: "David Brown",
    image: "/placeholder-avatar.jpg",
    mutualFriends: 2,
  },
  {
    id: "2",
    name: "Emma Davis",
    image: "/placeholder-avatar.jpg",
    mutualFriends: 4,
  },
  {
    id: "3",
    name: "Frank Miller",
    image: "/placeholder-avatar.jpg",
    mutualFriends: 1,
  },
];

export function FriendSuggestions() {
  const [suggestions, setSuggestions] = useState(sampleSuggestions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFriend = (id: string) => {
    setSuggestions(suggestions.filter((suggestion) => suggestion.id !== id));
    // In a real app, you would also send a friend request here
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search for new friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredSuggestions.map((suggestion) => (
        <Card key={suggestion.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={suggestion.image} alt={suggestion.name} />
                <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{suggestion.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {suggestion.mutualFriends} mutual friends
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addFriend(suggestion.id)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Friend
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
