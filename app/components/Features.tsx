import { CirclePlay, CloudRain, LockKeyhole, Zap } from 'lucide-react';

const features = [
  {
    name: 'Sign up for free',
    description: 'Create an account effortlessly with no upfront cost. Get started instantly with a simple sign-up and onboarding process.',
    icon: CloudRain,
  },
  {
    name: 'Blazingly fast',
    description: 'Experience lightning-fast performance, ensuring smooth and responsive interactions. Get tasks done quickly without delays or interruptions.',
    icon: Zap,
  },
  {
    name: 'Super secure with nylas',
    description: 'Your data is safeguarded with cutting-edge security, powered by Nylas, offering peace of mind and encryption.',
    icon: LockKeyhole,
  },
  {
    name: 'Easy to use',
    description: 'Intuitive design makes navigating simple. No steep learning curve—just get started and enjoy a seamless experience.',
    icon: CirclePlay,
  },
];

export default function Features() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With CalendarMe you can arrange meetings quickly. We make it easy for
          you to schedule meetings in minutes. The meetings are very fast and
          simple to schedule.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
