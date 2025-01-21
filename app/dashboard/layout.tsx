import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import DashboardLinks from '../components/DashboardLinks';
import Logo from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { signOut } from '../lib/auth';
import { requireUser } from '../lib/hooks';
import Image from 'next/image';
import { prisma } from '../lib/db';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

async function getUserData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      userName: true,
      grantId: true
    }
  });

  if (!userData?.userName) {
    return redirect('/onboarding');
  }

  if (!userData?.grantId) {
    return redirect('/onboarding/grant-id');
  }

  return userData;
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();
  await getUserData(session.user?.id as string);
  
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Logo logosize="small" />
            </div>

            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-mutes/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0"
                  size="icon"
                  variant="outline"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <VisuallyHidden.Root>
                  <SheetTitle>Menu</SheetTitle>
                </VisuallyHidden.Root>
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Image
                      src={session?.user?.image as string}
                      alt="profile image"
                      width={20}
                      height={20}
                      className="w-full h-full rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings"> Settings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        'use server';
                        await signOut();
                      }}
                      className="w-full"
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}
