export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full ">
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
