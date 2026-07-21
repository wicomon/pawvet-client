import { getUser } from '@/lib/dal';
import DashboardShell from '@/components/layout/DashboardShell';
import ApolloWrapper from '@/lib/apollo/ApolloWrapper';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getUser();

  const userRole = user?.role.name ?? 'NOT_AUTHENTICATED';
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Usuario';
  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : 'US';
  const companyName = user?.company.name ?? '';
  const menus = [...(user?.menus ?? [])].sort((a, b) => a.order - b.order);
  return (
    <div className='bg-wv-canvas font-body text-wv-ink'>
        <DashboardShell
          userName={userName}
          userRole={userRole}
          userInitials={userInitials}
          companyName={companyName}
          menus={menus}
        >
          <ApolloWrapper>{children}</ApolloWrapper>
        </DashboardShell>
    </div>
  );
}
