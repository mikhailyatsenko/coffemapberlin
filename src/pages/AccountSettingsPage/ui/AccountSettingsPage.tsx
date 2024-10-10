import { Account } from 'widgets/Account';
import cls from './AccountSettingsPage.module.scss';

export const AccountSettingsPage = () => {
  return (
    <div className="container">
      <h1 className={cls.pageTitle}>Account Settings</h1>
      <Account />
    </div>
  );
};
