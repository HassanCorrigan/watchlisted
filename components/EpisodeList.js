import Link from 'next/link';
import { createStillPath } from '../helpers/createImagePath.js';
import styles from '../styles/episode.module.css';

const EpisodeList = ({ episodes }) => {
  console.log(episodes);
  return (
    <div className={styles.episodeList}>
      {episodes.map(episode => (
        <Link key={episode.id} href={'/'}>
          <a className={styles.stillContainer}>
            <img
              src={createStillPath(episode.still_path)}
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
