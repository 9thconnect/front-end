import AuthHeader from "@/components/header/authHeader";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-2 lg:px-14 m-auto lg:py-8">
      <section>
        <AuthHeader />
        {children}
      </section>
    </div>
  );
}
