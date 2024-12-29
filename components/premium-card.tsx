import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import pngman from "@/public/pngman.png";

export function PremiumCard() {
  return (
    <Card className="relative overflow-hidden bg-[#6366f1]">
      <CardContent className="p-6">
        <div className="relative z-10 space-y-4 pr-20">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Subscribe</h3>
            <p className="text-sm text-white/80">to our premium plan</p>
          </div>
          <p className="text-sm text-white/90">
            Subscribe to premium for more facilities.
          </p>
          <Button
            variant="secondary"
            className="w-full bg-white text-black hover:bg-white/90"
          >
            <a href="/settings/upgrade">Start Now</a>
          </Button>
        </div>
        <div className="absolute -top-4 right-0 h-[180px] w-[180px]">
          <Image
            src={pngman}
            alt="Premium illustration"
            className="object-contain"
            style={{ transform: "scaleX(-1)" }}
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}
