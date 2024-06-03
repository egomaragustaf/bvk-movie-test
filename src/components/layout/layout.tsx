type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <main className="mx-auto w-full">{children}</main>
    </div>
  );
}
