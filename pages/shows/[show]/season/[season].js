import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { tmdbFetch } from 'helpers/api';
import { truncateString } from 'helpers/string';
import { createBannerPath } from 'helpers/image-path';
import Layout from 'components/Layout';
import MediaHeader from 'components/MediaHeader';
import MediaInfoCard from 'components/MediaInfoCard';
import TraktActions from 'components/TraktActions';
import styles from 'styles/pages/media-page.module.css';

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

        <MediaInfoCard
          runTime={show.episode_run_time[0]}
          date={season.air_date}
          voteAverage={show.vote_average}
          voteCount={show.vote_count}
          networks={show.networks}
        />

        {/* {authenticated && <TraktActions media={season} />} */}

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
                    {truncateString(episode.overview, 140)}
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
