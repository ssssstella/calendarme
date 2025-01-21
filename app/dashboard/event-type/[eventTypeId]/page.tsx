import EditEventTypeForm from '@/app/components/EditEventTypeForm';
import { prisma } from '@/app/lib/db';
import { notFound } from 'next/navigation';

async function getEventTypeData(eventTypeId: string) {
  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  });

  if (!eventTypeData) {
    return notFound();
  }

  return eventTypeData;
}

export default async function EditEventTypeRoute({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const eventTypeData = await getEventTypeData(params.eventTypeId);

  return (
    <EditEventTypeForm
      id={eventTypeData.id}
      title={eventTypeData.title}
      description={eventTypeData.description}
      duration={eventTypeData.duration}
      videoCallProvider={eventTypeData.videoCallSoftware}
      url={eventTypeData.url}
    />
  );
}
