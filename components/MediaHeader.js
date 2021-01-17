import { createBannerPath } from 'helpers/createImagePath';
import Poster from 'components/Poster';
import styles from 'styles/media-header.module.css';

const MediaHeader = ({ title, banner, poster }) => {
  // console.log(title, banner, poster);
  return (
    <header
      style={{
        backgroundImage: `url(${createBannerPath(banner)})`,
      }}
      className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <Poster media={poster} />
    </header>
  );
};

export default MediaHeader;
