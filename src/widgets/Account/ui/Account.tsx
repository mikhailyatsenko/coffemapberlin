import { AccountSettings } from 'features/AccountSettings';
import { AvatarUpload } from 'features/AvatarUpload';

export const Account = () => {
  return (
    <>
      <AvatarUpload />
      <AccountSettings />
    </>
  );
};
