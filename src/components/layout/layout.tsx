import { Navbar } from "~/components/layout/navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto w-full">
      <Navbar />
      <main className="mx-auto max-w-7xl min-h-screen px-4 mt-16 space-y-8">
        {children}
      </main>
    </div>
  );
}
