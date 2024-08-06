import AuthHeader from "@/components/header/authHeader";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthHeader />
      {children}
    </section>
  );
}
