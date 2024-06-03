import { Button } from "~/components/ui/button";

interface WatchedButtonProps {
  isWatched: "default" | "checked";
  onClick: () => void;
}

export function WatchedButton({ isWatched, onClick }: WatchedButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={isWatched === "checked" ? "checked" : "default"}>
      {isWatched === "checked" ? "Unmark as Watched" : "Mark as Watched"}
    </Button>
  );
}
