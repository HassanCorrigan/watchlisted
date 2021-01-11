import Link from 'next/link';
import { createPosterPath } from '../helpers/createImagePath.js';
import styles from '../styles/horizontal-poster-list.module.css';

const SeasonList = ({ show, seasons }) => {
  return (
    <div>
      {show.number_of_seasons <= 1 ? (
        <h3>{show.number_of_seasons} Season</h3>
      ) : (
        <p>{show.number_of_seasons} Seasons</p>
      )}

      <div className={styles.posterList}>
        {seasons.map(season => (
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
    </div>
  );
};

export default SeasonList;
