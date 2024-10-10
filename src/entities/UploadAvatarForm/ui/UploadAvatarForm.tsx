import { useState } from 'react';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './UploadAvatarForm.module.scss';

interface UploadAvatarFormProps {
  avatar: string | null;
  displayName: string;
  handleUpload: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadError: string | null;
}
export const UploadAvatarForm = ({
  avatar,
  displayName,
  handleFileChange,
  handleUpload,
  uploadError,
}: UploadAvatarFormProps) => {
  const [isUploadFormActive, setIsUploadFormActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleCancel = () => {
    setIsUploadFormActive(false);
    setSelectedFile(null);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      handleFileChange(event);
    }
  };

  return (
    <div className={cls.settingsPictureCard}>
      <div className={cls.settingsPicture}>
        <div className={cls.profileAvatar}>
          <img src={avatar || './user-default-icon.svg'} alt={`${displayName}'s avatar`} />
        </div>
        <div className={cls.pictureRequirements}>
          <h4>Profile picture</h4>
          <p>PNG, JPEG under 200KB</p>
        </div>

        {!isUploadFormActive ? (
          <RegularButton
            clickHandler={() => {
              setIsUploadFormActive(true);
            }}
          >
            Upload new picture
          </RegularButton>
        ) : (
          <>
            <input type="file" accept="image/png, image/jpeg" onChange={onFileChange} />
            <RegularButton clickHandler={handleUpload} disabled={!selectedFile}>
              Upload now
            </RegularButton>
            <RegularButton theme="blank" clickHandler={handleCancel}>
              Cancel
            </RegularButton>
          </>
        )}

        {/* {avatar && (
          <RegularButton
            theme="blank"
            clickHandler={() => {
              console.log('Delete functionality');
            }}
          >
            Delete
          </RegularButton>
        )} */}
      </div>
      <div>{uploadError}</div>
    </div>
  );
};
