import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky flex justify-center">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-end px-4 sm:px-6">
        <ThemeToggle />
      </div>
    </header>
  );
}
