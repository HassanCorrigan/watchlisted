import { createPosterPath } from '../helpers/createImagePath.js';
import styles from '../styles/horizontal-poster-list.module.css';

const ShowList = ({ shows }) => {
  return (
    <div className={styles.posterList}>
      {shows.map(show => (
        <a href={`/shows/${show.id}`} key={show.id}>
          <img
            src={createPosterPath(show.poster_path)}
            alt={show.name}
            className={styles.poster}
          />
          <p className={styles.posterTitle}>{show.name}</p>
        </a>
      ))}
    </div>
  );
};

export default ShowList;
