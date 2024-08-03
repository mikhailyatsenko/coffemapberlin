import { InstagramEmbed } from 'react-social-media-embed';
import cls from './InstagramEmbed.module.scss';

interface InstagramEmbedProfileProps {
  username: string;
  normalView: boolean;
}
export const InstagramEmbedProfile = ({ username, normalView = false }: InstagramEmbedProfileProps) => {
  return (
    <div className={`${cls.embedWrapper} ${normalView ? cls.normalView : ''}`}>
      <div className={cls.embed}>
        <InstagramEmbed url={`https://www.instagram.com/${username}`} width={'100%'} />
      </div>
    </div>
  );
};
