import { createPosterPath } from 'helpers/image-path';
import styles from 'styles/components/poster.module.css';

const Poster = ({ media }) => {
  return (
    <img
      src={createPosterPath(media.poster_path)}
      alt={media.title || media.name}
      className={styles.poster}
    />
  );
};

export default Poster;
