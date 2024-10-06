'use client';

import { Fragment, type PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavLinkProps extends PropsWithChildren {
  href: string;
  withSheetClose?: boolean;
}

export function NavLink({
  children,
  href,
  withSheetClose = false,
}: NavLinkProps) {
  const pathname = usePathname();

  const [Wrapper, wrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [Fragment, {}];

  return (
    <Wrapper {...wrapperProps}>
      <Link
        href={href}
        className={cn([
          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
          pathname === href ? 'bg-muted' : 'text-muted-foreground',
        ])}
      >
        {children}
      </Link>
    </Wrapper>
  );
}
