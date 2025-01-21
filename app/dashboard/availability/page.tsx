import { updateAvailabilityAction } from '@/app/actions';
import { SubmitButton } from '@/app/components/SubmitButton';
import { prisma } from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { times } from '@/app/lib/times';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { notFound } from 'next/navigation';

async function getAvailability(userId: string) {
  const availability = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });

  if (!availability) {
    return notFound();
  }

  return availability;
}

export default async function AvailabilityRoute() {
  const session = await requireUser();
  const availability = await getAvailability(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          You can manage your availability here!
        </CardDescription>
      </CardHeader>
      <form action={updateAvailabilityAction}>
        <CardContent className="flex flex-col gap-y-4">
          {availability.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
            >
              <input type='hidden' name={`id-${item.id}`} value={item.id} />
              <div className="flex items-center gap-x-3">
                <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive} />
                <p>{item.day}</p>
              </div>
              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name={`toTime-${item.id}`} defaultValue={item.toTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="To Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton btnDescription='Save Changes' />
        </CardFooter>
      </form>
    </Card>
  );
}
