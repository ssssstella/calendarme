import { CreateMeetingAction } from '@/app/actions';
import { RenderCalendar } from '@/app/components/bookingForm/RenderCalendar';
import TimeTable from '@/app/components/bookingForm/TimeTable';
import { SubmitButton } from '@/app/components/SubmitButton';
import { prisma } from '@/app/lib/db';
import { getTimeZone } from '@/app/lib/times';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CalendarX2, Clock, VideoIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getEventTypes(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          image: true,
          name: true,
          availability: {
            select: { day: true, isActive: true },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: {
    userName: string;
    eventUrl: string;
  };
  searchParams: { date?: string; time?: string };
}) {
  const data = await getEventTypes(params.eventUrl, params.userName);
  const { timezone, gmtOffset } = getTimeZone();

  const selectedDate = searchParams.date
    ? new Date(`${searchParams.date} 00:00:00 ${gmtOffset}`)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: timezone,
    timeZoneName: 'short',
  })
    .format(selectedDate)
    .split('at')
    .map((part, idx) => (idx === 1 ? `(${part.trim()})` : part.trim()))
    .join(' ');

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
            <div>
              <img
                src={data.user?.image as string}
                alt="profile image of user"
                className="size-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-full w-[1px]" />

            <form action={CreateMeetingAction} className="flex flex-col gap-y-4">
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />
              <input type="hidden" name="userName" value={params.userName} />
              <input type="hidden" name="eventTypeId" value={data.id} />
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Your Email</Label>
                <Input name="email" placeholder="johndoe@example.com" />
              </div>
              <SubmitButton
                btnDescription="Book Meeting"
                className="w-full mt-5"
              />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
            <div>
              <img
                src={data.user?.image as string}
                alt="profile image of user"
                className="size-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.user?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-full w-[1px]" />

            <RenderCalendar availability={data.user?.availability as any} />

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <TimeTable
              selectedDate={selectedDate}
              userName={params.userName}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
