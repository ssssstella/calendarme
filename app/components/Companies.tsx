import Image from 'next/image';
import NylasLogo from '@/public/nylas-logo.png';
import NextLogo from '@/public/nextjs-logo.svg';
import VercelLogo from '@/public/vercel.svg';

export default function Companies() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <Image
          src={NylasLogo}
          alt="nylas logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image src={NextLogo} alt="next logo"className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"  />
        <Image src={VercelLogo} alt="vercel logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert" />
      </div>
    </div>
  );
}
