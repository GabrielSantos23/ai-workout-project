import { LoaderCircle } from "lucide-react";

interface LoadingIconProps {
  color?: string; // Classe de Tailwind para a cor
  size?: number; // Tamanho em pixels
}

export function LoadingIcon({
  color = "text-primary",
  size = 24,
}: LoadingIconProps) {
  return (
    <LoaderCircle
      className={`animate-spin ${color}`}
      style={{ width: size, height: size }}
    />
  );
}
