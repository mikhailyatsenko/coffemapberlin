import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" referrerPolicy="no-referrer" />
        <h1 className="profile-name">{user.displayName}</h1>
      </div>

      <div className="profile-section">
        <h2>Favorites</h2>
        <div className="cafe-list"></div>
      </div>

      <div className="profile-section"></div>
    </div>
  );
};
