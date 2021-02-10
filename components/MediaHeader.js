import { createBannerPath } from 'helpers/image-path';
import Poster from 'components/Poster';
import styles from 'styles/components/media-header.module.css';

const MediaHeader = ({ title, banner, poster }) => {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${createBannerPath(banner)})` }}>
      <h2 className={styles.title}>{title}</h2>
      <Poster media={poster} />
    </header>
  );
};

export default MediaHeader;
