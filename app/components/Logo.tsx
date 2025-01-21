import Image from 'next/image';
import Link from 'next/link';
import LogoImg from '@/public/logo.png';

type Logosize = 'normal' | 'small';

export default function Logo({ logosize = 'normal' }: { logosize?: Logosize }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={LogoImg}
        alt="logo"
        className={logosize === 'normal' ? 'size-10' : 'size-8'}
      />
      {logosize === 'normal' ? (
        <h4 className="text-3xl font-semibold">
          Calendar<span className="text-blue-500">Me</span>
        </h4>
      ) : (
        <p className="text-xl font-bold">
          Calendar<span className="text-blue-500">Me</span>
        </p>
      )}
    </Link>
  );
}
