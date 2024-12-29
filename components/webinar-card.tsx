import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Participant {
  image: string;
  name: string;
}

interface WebinarCardProps {
  trainer: {
    name: string;
    role: string;
    image: string;
  };
  title: string;
  participants: Participant[];
  duration: string;
  date: string;
  time: string;
}

export function WebinarCard({
  trainer,
  title,
  participants,
  duration,
  date,
  time,
}: WebinarCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={trainer.image} alt={trainer.name} />
          <AvatarFallback>{trainer.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{trainer.name}</h3>
          <p className="text-sm text-muted-foreground">{trainer.role}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-primary">Webinar</p>
          <h4 className="text-xl font-bold">{title}</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Participants</p>
            <Switch />
          </div>
          <div className="flex -space-x-2">
            {participants.map((participant, i) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarImage src={participant.image} alt={participant.name} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
              10+
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium">{duration}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">{date}</p>
            <p className="font-medium">{time}</p>
          </div>
        </div>
        <Button className="w-full bg-red-500 hover:bg-red-600">Join Now</Button>
      </CardContent>
    </Card>
  );
}
