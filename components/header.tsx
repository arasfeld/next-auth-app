import Link from 'next/link';

import { Logo } from './logo';
import { SideNavToggle } from './side-nav-toggle';
import { ThemeToggle } from './theme-toggle';
import { UserButton } from './user-button';

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 md:px-6 shrink-0">
      <SideNavToggle />
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-2">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
