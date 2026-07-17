import { getUser } from "@/lib/dal";
import DashboardShell from "@/components/layout/DashboardShell";
import ApolloWrapper from "@/lib/apollo/ApolloWrapper";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server Component does the data-fetching, then hands the result down as
  // props to the Client Component shell — see node_modules/next/dist/docs/
  // 01-app/01-getting-started/05-server-and-client-components.md.
  const user = await getUser();

  const userName = user ? `${user.firstName} ${user.lastName}` : "Usuario";
  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "US";
  const organizationName = user?.organization.name ?? "";
  const menus = [...(user?.menus ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-wv-canvas font-body text-wv-ink">
      <DashboardShell
        userName={userName}
        userInitials={userInitials}
        organizationName={organizationName}
        menus={menus}
      >
        <ApolloWrapper>{children}</ApolloWrapper>
      </DashboardShell>
    </div>
  );
}
