'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from './SubmitButton';
import { useActionState, useState } from 'react';
import { SettingsAction } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { settingsSchema } from '../lib/zodSchemas';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '../lib/uploadthing';
import { toast } from 'sonner';

interface SettingFormProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export default function SettingsForm({
  fullName,
  email,
  profileImage,
}: SettingFormProps) {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="John Doe"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled defaultValue={email} placeholder="test@test.com" />
          </div>
          <div className="flex flex-col gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <img
                  src={currentProfileImage}
                  alt="profile image"
                  className="size-16 rounded-lg"
                />
                <Button
                  type="button"
                  onClick={handleDeleteImage}
                  variant="destructive"
                  className="absolute -top-3 -right-3 size-3 px-2 border border-secondary"
                >
                  <X className="size-3" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success('Profile image has been uploaded successfully');
                }}
                onUploadError={(err) => {
                  console.log('the image could not be uploaded', err);
                  toast.error(err.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className='text-red-500 text-sm'>{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton btnDescription="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
