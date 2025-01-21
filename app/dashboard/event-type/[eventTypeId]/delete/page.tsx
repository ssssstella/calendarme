import { DeleteEventTypeAction } from '@/app/actions';
import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function DeleteEventTypeRoute({
  params,
}: {
  params: {
    eventTypeId: string;
  };
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            Are you sure to delete this event type?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name='id' value={params.eventTypeId} />
            <SubmitButton btnDescription='Delete Event Type' variant='destructive' />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
