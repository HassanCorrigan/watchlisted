import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { tmdbFetch } from 'helpers/api';
import { createBannerPath } from 'helpers/image-path';
import Layout from 'components/Layout';
import MediaHeader from 'components/MediaHeader';
import MediaInfoCard from 'components/MediaInfoCard';
import TraktActions from 'components/TraktActions';
import styles from 'styles/pages/media-page.module.css';

const Season = ({ show, episode }) => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(user.authenticated);
  }, []);

  return (
    <Layout>
      <section>
        <MediaHeader
          title={episode.name}
          banner={show.backdrop_path}
          poster={show}
        />

        <MediaInfoCard
          runTime={show.episode_run_time[0]}
          date={episode.air_date}
          voteAverage={episode.vote_average}
          voteCount={episode.vote_count}
          networks={show.networks}
        />

        <div className={`card ${styles.episodeOverview}`}>
          <p>
            {`Season ${episode.season_number} - Episode ${episode.episode_number}`}
          </p>
          <img
            className={styles.still}
            src={createBannerPath(episode.still_path)}
            alt={episode.name}
          />
          <p>
            Average Rating: &#11088; {episode.vote_average} (
            {episode.vote_count})
          </p>
          <p className={styles.overview}>{episode.overview}</p>
        </div>

        {authenticated && <TraktActions />}

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

  const episode = await tmdbFetch(
    `tv/${params.show}/season/${params.season}/episode/${params.episode}`
  );

  return {
    props: {
      show,
      episode,
    },
  };
}

export default Season;
