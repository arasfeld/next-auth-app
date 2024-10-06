import { redirect } from 'next/navigation';

import { SideNav } from '@/components/side-nav';
import { auth } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 overflow-y-auto py-4 md:block">
        <SideNav />
      </aside>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}
