import Link from 'next/link';
import { createPosterPath } from 'helpers/createImagePath.js';
import styles from 'styles/horizontal-poster-list.module.css';

const SeasonList = ({ show }) => {
  return (
    <div className={styles.posterList}>
      {show.seasons.map(season => (
        <Link
          href={`/shows/${show.id}/season/${season.season_number}`}
          key={season.id}>
          <a>
            <img
              src={createPosterPath(season.poster_path)}
              alt={season.name}
              className={styles.poster}
            />
            <p className={styles.posterTitle}>{season.name}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SeasonList;
