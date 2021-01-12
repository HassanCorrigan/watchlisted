import Link from 'next/link';
import { createBannerPath } from 'helpers/createImagePath.js';
import styles from 'styles/episode-list.module.css';

const EpisodeList = ({ show, season, episodes }) => {
  // console.log(episodes);
  return (
    <div className={styles.episodeList}>
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
              <h2>{episode.name}</h2>
              <span>
                Season {episode.season_number} - Episode{' '}
                {episode.episode_number}
              </span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default EpisodeList;