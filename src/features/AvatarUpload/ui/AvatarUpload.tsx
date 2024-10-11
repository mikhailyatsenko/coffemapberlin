import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { UploadAvatarForm } from 'entities/UploadAvatarForm';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { UPLOAD_AVATAR } from 'shared/query/apolloQueries';
import { Loader } from 'shared/ui/Loader';
import Toast from 'shared/ui/ToastMessage/Toast';

interface UploadResponse {
  fileUrl?: string;
  error?: string;
}

export const AvatarUpload: React.FC = () => {
  const { user, checkAuth, loading: authLoading } = useAuth();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [toastMessage, setToastMessage] = useState<string>('');

  const [uploadAvatar, { loading: avatarUpdateLoading }] = useMutation<{ uploadAvatar: { success: boolean } }>(
    UPLOAD_AVATAR,
  );

  const [isLoading, setIsloading] = useState<boolean>(false);

  if (!user) return null;
  if (isLoading || authLoading || avatarUpdateLoading) return <Loader />;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setIsloading(true);

    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('avatar', file);

    const response = await fetch('https://yatsenko.site/upload-avatar', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const responseData: UploadResponse = await response.json();

    if (responseData.error) {
      setUploadError(responseData.error);
      setIsloading(false);
      return;
    }

    const { data } = await uploadAvatar({
      variables: {
        userId: user.id,
        fileUrl: responseData.fileUrl,
      },
    });

    if (data?.uploadAvatar.success) {
      checkAuth();
      setIsloading(false);
      setToastMessage('Avatar uploaded successfully');
      console.log('Avatar uploaded successfully');
    }
  };

  return (
    <>
      <UploadAvatarForm
        avatar={user?.avatar}
        displayName={user?.displayName}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        uploadError={uploadError}
      />
      <Toast message={toastMessage} theme="green" />
    </>
  );
};
