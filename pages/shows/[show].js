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
import Poster from 'components/Poster';
import styles from 'styles/media-page.module.css';

const Show = ({ show }) => {
  const { user } = useAppContext();
  const latestEpisode = show.last_episode_to_air;
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(user.authenticated);
  }, []);

  return (
    <Layout>
      <section>
        <MediaHeader
          title={show.name}
          banner={show.backdrop_path}
          poster={show}
        />

        <div className={styles.content}>
          <div className={styles.info}>
            <p>Run Time: {show.episode_run_time[0]} mins</p>
            <p>First Aired: {formatDate(show.first_air_date)}</p>
            <p>
              Average Rating: &#11088; <b>{show.vote_average}</b> (
              {show.vote_count} votes)
            </p>

            {show.next_episode_to_air !== null && (
              <p>{show.next_episode_to_air.air_date}</p>
            )}

            {show.networks.map(network => (
              <span className='tag' key={network.id}>
                {network.name}{' '}
              </span>
            ))}
          </div>

          {authenticated && <TraktActions />}

          <p className={styles.overview}>{show.overview}</p>

          <div className={styles.seasonOverview}>
            {show.number_of_seasons === 1 ? (
              <h3>{show.number_of_seasons} Season</h3>
            ) : (
              <h3>{show.number_of_seasons} Seasons</h3>
            )}

            <div className={styles.seasonList}>
              {show.seasons.map((season, index) => (
                <Link
                  href={`/shows/${show.id}/season/${season.season_number}`}
                  key={index}>
                  <a>
                    <Poster media={show} />
                    <p className={styles.posterTitle}>{season.name}</p>
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {latestEpisode && (
            <div className={styles.recentEpisode}>
              <h3>Latest Episode</h3>
              <Link
                href={`/shows/${show.id}/season/${latestEpisode.season_number}/episode/${latestEpisode.episode_number}`}>
                <a>
                  <img
                    src={createBannerPath(latestEpisode.still_path)}
                    alt={latestEpisode.name}
                    className={styles.still}
                  />
                  <div className={styles.episodeDetails}>
                    <h4>{latestEpisode.name}</h4>
                    <p>
                      Season {latestEpisode.season_number} - Episode{' '}
                      {latestEpisode.episode_number}
                    </p>
                    <p>{truncateString(latestEpisode.overview, 215)}</p>
                  </div>
                </a>
              </Link>
            </div>
          )}

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

  return {
    props: {
      show,
    },
  };
}

export default Show;
