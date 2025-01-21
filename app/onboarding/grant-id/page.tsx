import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarCheck2, Waypoints } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost done!</CardTitle>
          <CardDescription className="flex gap-1 items-center">
            We have to connect your calendar to your account now
            <span className="inline text-primary">
              <Waypoints className="size-4" />
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4" />
              Connect Calendar to your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
