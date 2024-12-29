import { Button } from "@/components/ui/button";
import { LoadingIcon } from "./loader";

type LoadingButtonProps = {
  isLoading: boolean;
  color?: string;
  textButton?: string;
  type?: "button" | "submit" | "reset";
};

export function LoadingButton({
  isLoading,
  color,
  textButton = "Submit",
  type = "button",
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      className="flex items-center justify-center "
      disabled={isLoading}
    >
      {isLoading ? <LoadingIcon color={color} size={16} /> : textButton}
    </Button>
  );
}
