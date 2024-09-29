import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
// import { UserReviewActivity } from 'features/UserReviewActivity';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { GET_USER_PROFILE } from 'shared/query/apolloQuries';
import { FormField } from 'shared/ui/FormField';
import { Loader } from 'shared/ui/Loader';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './UserProfile.module.scss';

interface UserPlace {
  id: string;
  name?: string;
}

interface GetUserProfileData {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  reviewedLocations: UserPlace[];
}

const UserProfile = () => {
  const { user, loading: loadingUserData } = useAuth();
  const { favoritePlaces } = usePlaces();

  const { loading, error, data } = useQuery<{ getUserProfile: GetUserProfileData }>(GET_USER_PROFILE, {
    variables: { userId: user?.id },
    skip: !user,
  });

  const personalDataForm = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (data?.getUserProfile) {
      personalDataForm.reset({
        displayName: data.getUserProfile.name,
        email: data.getUserProfile.email,
        oldPassword: '',
        newPassword: '',
      });
    }
  }, [data, personalDataForm]);

  if (loadingUserData || loading) return <Loader />;

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (!data?.getUserProfile) {
    return <p>No profile data available.</p>;
  }

  if (error) return <p>Error: {error.message}</p>;

  const {
    reviewedLocations,
    name,
    avatar,
    // email
  } = data.getUserProfile;

  return (
    <div className="container">
      <div className={cls.settingsPictureCard}>
        <div className={cls.settingsPicture}>
          <div className={cls.profileAvatar}>
            <img src={avatar || './user-default-icon.svg'} alt={`${name}'s avatar`} />
          </div>
          <div className={cls.pictureRequirements}>
            <h4>Profile picture</h4>
            <p>PNG, JPEG under 15MB</p>
          </div>
          <div className={cls.pictureButtons}>
            <RegularButton>Upload new picture</RegularButton>
            <RegularButton theme="blank">Delete</RegularButton>
          </div>
        </div>
      </div>
      <div className={cls.settingsSection}>
        <div className={cls.settingsCard}>
          <h2>Personal data</h2>
          <FormProvider {...personalDataForm}>
            <form className={cls.userForm}>
              <FormField fieldName="displayName" type="text" labelText="Name" />
              <FormField fieldName="email" type="email" labelText="E-mail" />

              <RegularButton>Save changes</RegularButton>
            </form>
          </FormProvider>
        </div>
        <div className={cls.settingsCard}>
          <h2>Password</h2>
          <FormProvider {...personalDataForm}>
            <form className={cls.userForm}>
              <FormField fieldName="oldPassword" type="password" labelText="Old Password" />
              <FormField fieldName="newPassword" type="password" labelText="Repeat password" />

              <RegularButton>Save changes</RegularButton>
            </form>
          </FormProvider>
        </div>
      </div>

      <h4>Favorite Locations ({favoritePlaces?.length})</h4>
      {/* <ul>{favoritePlaces?.map((place) => <li key={place.properties.id}>{place.properties.name}</li>)}</ul> */}

      <h4>Reviewed Locations ({reviewedLocations.length})</h4>
      {/* <ul>
        {reviewedLocations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default UserProfile;
