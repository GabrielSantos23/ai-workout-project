import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    description: "Basic features for getting started",
    price: "$0",
    duration: "/month",
    features: [
      "Basic AI workout suggestions",
      "Limited progress tracking",
      "Access to basic exercise library",
      "Community support",
    ],
  },
  {
    name: "Monthly",
    description: "Perfect for individuals getting started",
    price: "$9.99",
    duration: "/month",
    features: [
      "Personalized AI workout plans",
      "Advanced progress tracking",
      "Full exercise library access",
      "Workout history",
      "Basic analytics",
    ],
  },
  {
    name: "Yearly",
    description: "Best value for committed fitness enthusiasts",
    price: "$89.99",
    duration: "/year",
    features: [
      "All Monthly features",
      "Advanced analytics",
      "Custom exercise routines",
      "Priority support",
      "Exclusive content",
      "2 months free",
    ],
    popular: true,
  },
];

export default function UpgradePage() {
  return (
    <div className="space-y-6 ">
      <div>
        <h3 className="text-lg font-medium">Upgrade to Pro</h3>
        <p className="text-sm text-muted-foreground">
          Choose the perfect plan for your fitness journey
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.popular ? "border-primary" : undefined}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.duration}</span>
              </div>
              <ul className="grid gap-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.name === "Free" ? "Current Plan" : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
