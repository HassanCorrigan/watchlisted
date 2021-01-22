import Link from 'next/link';
import { createBannerPath } from 'helpers/createImagePath';
import styles from 'styles/episode-list.module.css';

const EpisodeList = ({ show, season, episodes }) => {
  return (
    <div className={styles.episodeList}>
      {episodes.length === 1 ? (
        <h3>{episodes.length} Episode</h3>
      ) : (
        <h3>{episodes.length} Episodes</h3>
      )}
      {episodes.map(episode => (
        <Link
          key={episode.id}
          href={`/shows/${show.id}/season/${season.season_number}/episode/${episode.episode_number}`}>
          <a className={styles.stillContainer}>
            <img
              src={createBannerPath(episode.still_path)}
              alt={episode.name}
              className={styles.still}
            />
            <div className={styles.episodeDetails}>
              <h4 className={styles.title}>{episode.name}</h4>
              <p className={styles.info}>
                Season {episode.season_number} - Episode{' '}
                {episode.episode_number}
              </p>
              <p className={styles.overview}>{episode.overview}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default EpisodeList;
