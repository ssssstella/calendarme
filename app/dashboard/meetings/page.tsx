import { CancelMeetingAction } from '@/app/actions';
import EmptyState from '@/app/components/EmptyState';
import { SubmitButton } from '@/app/components/SubmitButton';
import { prisma } from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { nylas } from '@/app/lib/nylas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format, fromUnixTime } from 'date-fns';
import { Video } from 'lucide-react';
import Link from 'next/link';

async function getEventsData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error('User not found');
  }

  const eventsData = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return eventsData;
}

export default async function MeetingsRoute() {
  const session = await requireUser();
  const eventsData = await getEventsData(session.user?.id as string);

  return (
    <>
      {eventsData.data.length === 0 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet"
          buttonText="Create a new event type"
          href="/dashboard/new-event-type"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming events booked with you and the event type link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {eventsData.data.map((item) => (
              <form key={item.id} action={CancelMeetingAction}>
                <input type='hidden' name='eventId' value={item.id} />
                <div
                  className="grid grid-cols-3 justify-between items-center"
                >
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM')}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.startTime), 'hh:mm a')}-
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.endTime), 'hh:mm a')}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                      <Link
                        className="text-xs text-primary underline underline-offset-4"
                        //@ts-ignore
                        href={item.conferencing.details.url}
                        target="_blank"
                      >
                        Join Meeting
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <SubmitButton
                    btnDescription="Cancel Event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
         
        </Card>
      )}
    </>
  );
}
