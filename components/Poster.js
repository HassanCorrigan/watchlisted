import { createPosterPath } from 'helpers/createImagePath.js';
import styles from 'styles/poster.module.css';

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
