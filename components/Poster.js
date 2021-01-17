import { createPosterPath } from 'helpers/createImagePath';
import styles from 'styles/poster.module.css';

const Poster = ({ media }) => {
  // console.log(media);
  return (
    <img
      src={createPosterPath(media.poster_path)}
      alt={media.title || media.name}
      className={styles.poster}
    />
  );
};

export default Poster;
