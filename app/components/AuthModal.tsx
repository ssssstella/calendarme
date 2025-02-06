import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import GithubLogo from '@/public/github.svg';
import GoogleLogo from '@/public/google.svg';
import Logo from './Logo';
import { signIn } from '../lib/auth';
import { SubmitButton } from './SubmitButton';

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row justify-center items-center gap-2">
          <Logo />
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
            className="w-full"
          >
            <SubmitButton btnDescription='Sign in with Google' variant='outline' className='w-full'
            imgSrc={GoogleLogo}
            imgAlt='google logo' />
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('github');
            }}
            className="w-full"
          >
            <SubmitButton btnDescription='Sign in with Github' variant='outline' className='w-full'
            imgSrc={GithubLogo}
            imgAlt='github logo' />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
