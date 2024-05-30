import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ui/mode-toggle";

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-4">
      <h1>Hello World</h1>
      <Button>Click Me!</Button>
      <ModeToggle />
    </div>
  );
}
