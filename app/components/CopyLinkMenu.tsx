'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CopyLinkMenu({ meetingUrl }: { meetingUrl: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success('URL has been copied');
    } catch (error) {
      toast.error('URL could not be copied');
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="size-4" />
      Copy
    </DropdownMenuItem>
  );
}
