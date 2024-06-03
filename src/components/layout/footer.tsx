import { Link } from "react-router-dom";

export function Footer() {
  const getCurrentYear = new Date().getFullYear();

  return (
    <div className="w-full flex items-center justify-center border-t py-6 mt-20">
      <footer className="max-w-7xl flex w-full items-center justify-between px-4">
        <span>&copy; {getCurrentYear} Ego Maragustaf</span>
        <Link to="/">
          <span>BVK Movie</span>
        </Link>
      </footer>
    </div>
  );
}
