import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { tmdbFetch } from 'helpers/apiFetch';
import { formatDate } from 'helpers/date';
import { truncateString } from 'helpers/string';
import { createBannerPath } from 'helpers/createImagePath';
import Layout from 'components/Layout';
import MediaHeader from 'components/MediaHeader';
import TraktActions from 'components/TraktActions';
import styles from 'styles/media-page.module.css';

const Season = ({ show, season }) => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(user.authenticated);
  }, []);

  return (
    <Layout>
      <section>
        <MediaHeader
          title={`${show.name} - ${season.name}`}
          banner={show.backdrop_path}
          poster={show}
        />

        <div className={styles.content}>
          <div className={styles.info}>
            <p>Run Time: {show.episode_run_time[0]} mins</p>
            <p>
              Average Rating: &#11088; <b>{show.vote_average}</b> (
              {season.vote_count} votes)
            </p>

            {season.air_date !== null && <p>{formatDate(season.air_date)}</p>}

            {show.networks.map(network => (
              <span className='tag' key={network.id}>
                {network.name}{' '}
              </span>
            ))}
          </div>

          {authenticated && <TraktActions />}

          <p className={styles.overview}>{season.overview}</p>

          <div className={styles.episodeList}>
            {season.episodes.length === 1 ? (
              <h3>{season.episodes.length} Episode</h3>
            ) : (
              <h3>{season.episodes.length} Episodes</h3>
            )}
            {season.episodes.map(episode => (
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
                    <p>
                      Season {episode.season_number} - Episode{' '}
                      {episode.episode_number}
                    </p>
                    <p className={styles.overview}>
                      {truncateString(episode.overview, 215)}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          <div className={styles.meta}>
            {show.genres.map(genre => (
              <span className='tag' key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const show = await tmdbFetch(`tv/${params.show}`);

  const season = await tmdbFetch(`tv/${params.show}/season/${params.season}`);

  return {
    props: {
      show,
      season,
    },
  };
}

export default Season;
