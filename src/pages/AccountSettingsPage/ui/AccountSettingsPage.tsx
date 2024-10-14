import { useEffect } from 'react';
import { Account } from 'widgets/Account';
import cls from './AccountSettingsPage.module.scss';

export const AccountSettingsPage = () => {
  useEffect(() => {
    document.title = 'Account Settings | Berlin Coffee Map';
  }, []);
  return (
    <div className="container">
      <h1 className={cls.pageTitle}>Account Settings</h1>
      <Account />
    </div>
  );
};
