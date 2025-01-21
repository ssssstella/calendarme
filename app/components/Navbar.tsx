import Logo from './Logo';
import { AuthModal } from './AuthModal';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
      <Logo />
      <div className="hidden md:flex md:justify-end md:space-x-4">
        <ThemeToggle />
        <AuthModal />
      </div>
    </div>
  );
}
