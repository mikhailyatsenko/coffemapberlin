import { AccountSettings } from 'features/AccountSettings';
import cls from './AccountSettingsPage.module.scss';

export const AccountSettingsPage = () => {
  return (
    <div className="container">
      <h1 className={cls.pageTitle}>Account Settings</h1>
      <AccountSettings />
    </div>
  );
};
