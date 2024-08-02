import { InstagramEmbed } from 'react-social-media-embed';
import cls from './InstagramEmbed.module.scss';

interface InstagramEmbedProfileProps {
  username: string;
}
export const InstagramEmbedProfile = ({ username }: InstagramEmbedProfileProps) => {
  return (
    <div className={cls.embedWrapper}>
      <div className={cls.embed}>
        <InstagramEmbed url={`https://www.instagram.com/${username}`} width={'100%'} />
      </div>
    </div>
  );
};
