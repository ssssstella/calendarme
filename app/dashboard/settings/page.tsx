import SettingsForm from '@/app/components/SettingsForm';
import { prisma } from '@/app/lib/db';
import { requireUser } from '@/app/lib/hooks';
import { notFound } from 'next/navigation';

async function getUserData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!userData) {
    return notFound();
  }

  return userData;
}

export default async function SettingsRoute() {
  const session = await requireUser();
  const userData = await getUserData(session.user?.id as string);

  return (
    <SettingsForm
      email={userData.email}
      fullName={userData.name as string}
      profileImage={userData.image as string}
    />
  );
}
