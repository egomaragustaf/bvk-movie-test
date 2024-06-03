import { Link } from "react-router-dom";
import { ModeToggle } from "~/components/ui/mode-toggle";

const navbar = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/watched",
    text: "Watched Movies",
  },
];

export function Navbar() {
  return (
    <div className="w-full flex items-center justify-center border-b py-6">
      <nav className="max-w-7xl flex w-full items-center justify-between font-semibold px-4">
        <h1 className="text-2xl hover:text-green-500">
          <Link to="/">BVK Movie</Link>
        </h1>
        <ul className="flex items-center justify-center gap-6 ">
          {navbar.map((nav) => {
            return (
              <li key={nav.text} className="hover:text-green-500">
                <Link to={nav.to}>{nav.text}</Link>
              </li>
            );
          })}
          <ModeToggle />
        </ul>
      </nav>
    </div>
  );
}
