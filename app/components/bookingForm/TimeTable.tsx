import { prisma } from '@/app/lib/db';
import { nylas } from '@/app/lib/nylas';
import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from 'date-fns';
import Link from 'next/link';
import { GetFreeBusyResponse, NylasResponse } from 'nylas';

async function getAvailability(userName: string, selectedDate: Date) {
  const currentDay = format(selectedDate, 'EEEE');
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      user: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      toTime: true,
      id: true,
      user: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });

  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.user?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.user?.grantEmail as string],
    },
  });
  return { data, nylasCalendarData };
}

interface TimeTableProps {
  selectedDate: Date;
  userName: string;
  duration: number;
}

function calculateAvailableTimeSlots(
  date: string,
  dbAvailability: { fromTime: string | undefined; toTime: string | undefined },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) {
  const now = new Date();
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  );

  const availableTo = parse(
    `${date} ${dbAvailability.toTime}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  );

  const busySlots = nylasData.data[0].timeSlots.map((slot) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  const allSlots = [];
  let currentSlot = availableFrom;
  while (isBefore(currentSlot, availableTo)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);
    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });

  return freeSlots.map((slot) => format(slot, 'HH:mm'));
}

export default async function TimeTable({
  selectedDate,
  userName,
  duration,
}: TimeTableProps) {
  const { data, nylasCalendarData } = await getAvailability(
    userName,
    selectedDate
  );

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  const dbAvailability = { fromTime: data?.fromTime, toTime: data?.toTime };

  const availableSlots = calculateAvailableTimeSlots(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, 'EEE')}{' '}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, 'MMM. d')}
        </span>
      </p>

      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              key={index}
              href={`?date=${format(selectedDate, 'yyyy-MM-dd')}&time=${slot}`}
            >
              <Button className="w-full mb-2" variant="outline">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>no available time slots</p>
        )}
      </div>
    </div>
  );
}
