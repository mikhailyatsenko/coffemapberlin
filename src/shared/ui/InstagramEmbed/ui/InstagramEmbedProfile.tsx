import { InstagramEmbed } from 'react-social-media-embed';
import cls from './InstagramEmbed.module.scss';
import { AboutPage } from 'pages/AboutPage';

interface InstagramEmbedProfileProps {
  username: string;
  normalView: boolean;
}
export const InstagramEmbedProfile = ({ username, normalView = false }: InstagramEmbedProfileProps) => {
  return (
    <div className={`${cls.embedWrapper} ${normalView ? cls.backDrop : ''}`}>
      <div className={`${cls.embed}  ${normalView ? cls.normalView : ''}`}>
        <InstagramEmbed
          embedPlaceholder={<AboutPage />}
          // placeholderDisabled={true}
          // placeholderImageUrl="https://3welle.com/places-images/coffeelab.jpg"
          url={`https://www.instagram.com/${username}`}
          width={'100%'}
        />
      </div>
    </div>
  );
};
