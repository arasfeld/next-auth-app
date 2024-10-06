import { CheckIcon, PersonIcon } from '@radix-ui/react-icons';

import { NavLink } from '@/components/nav-link';

interface SideNavProps {
  withSheetClose?: boolean;
}

export function SideNav({ withSheetClose = false }: SideNavProps) {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <nav className="grid items-start px-2 text-sm font-medium gap-2 lg:px-4">
        <NavLink href="/admin/users" withSheetClose={withSheetClose}>
          <PersonIcon className="h-4 w-4" />
          Users
        </NavLink>
        <NavLink href="/admin/roles" withSheetClose={withSheetClose}>
          <CheckIcon className="h-4 w-4" />
          Roles
        </NavLink>
      </nav>
    </div>
  );
}
