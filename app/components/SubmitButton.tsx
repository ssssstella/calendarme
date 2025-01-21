'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface SubmitBtnProps {
  btnDescription: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
}

export function SubmitButton({
  btnDescription,
  variant,
  className,
  imgSrc,
  imgAlt,
}: SubmitBtnProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn('w-fit', className)}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn('w-fit', className)}
        >
          {imgSrc && imgAlt ? (
            <Image src={imgSrc} alt={imgAlt} className="size-4 mr-2" />
          ) : (
            ''
          )}
          {btnDescription}
        </Button>
      )}
    </>
  );
}


