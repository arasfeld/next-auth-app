import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { SideNav } from '@/components/side-nav';

export function SideNavToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="left">
        <SheetHeader>
          <Logo />
          <SheetTitle>
            <VisuallyHidden.Root>Admin Navigation Menu</VisuallyHidden.Root>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>
              Select a admin route to navigate to.
            </VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <SideNav withSheetClose />
      </SheetContent>
    </Sheet>
  );
}
