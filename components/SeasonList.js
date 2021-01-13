import Link from 'next/link';
import Poster from 'components/Poster.js';
import styles from 'styles/horizontal-poster-list.module.css';

const SeasonList = ({ show }) => {
  return (
    <div className={styles.posterList}>
      {show.seasons.map(season => (
        <Link
          href={`/shows/${show.id}/season/${season.season_number}`}
          key={season.id}>
          <a>
            <Poster media={show} />
            <p className={styles.posterTitle}>{season.name}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SeasonList;
