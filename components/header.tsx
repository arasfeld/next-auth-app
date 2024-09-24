import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import { UserButton } from './user-button';

export function Header() {
  return (
    <header className="sticky flex justify-center">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <MainNav />
        <div className="flex gap-2">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
