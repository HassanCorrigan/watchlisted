import Link from 'next/link';
import { createPosterPath } from 'helpers/createImagePath.js';
import styles from 'styles/horizontal-poster-list.module.css';

const ShowList = ({ shows }) => {
  return (
    <div className={styles.posterList}>
      {shows.map(show => (
        <Link href={`/shows/${show.id}`} key={show.id}>
          <a>
            <img
              src={createPosterPath(show.poster_path)}
              alt={show.name}
              className={styles.poster}
            />
            <p className={styles.posterTitle}>{show.name}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ShowList;
