import { InstagramEmbed } from 'react-social-media-embed';
import cls from './InstagramEmbed.module.scss';
import { BackgroundTexture } from './BackgroundTexture';

interface InstagramEmbedProfileProps {
  username: string;
  normalView: boolean;
}
export const InstagramEmbedProfile = ({ username, normalView = false }: InstagramEmbedProfileProps) => {
  return (
    <div className={`${cls.embedWrapper} ${normalView ? cls.backDrop : ''}`}>
      <div className={`${cls.embed}  ${normalView ? cls.normalView : ''}`}>
        <InstagramEmbed
          embedPlaceholder={<BackgroundTexture />}
          // scriptLoadDisabled={true}
          url={`https://www.instagram.com/${username}`}
          width={'100%'}
        />
      </div>
    </div>
  );
};
