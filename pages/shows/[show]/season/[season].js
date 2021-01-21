import { tmdbFetch } from 'helpers/apiFetch';
import { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import Layout from 'components/Layout';
import MediaHeader from 'components/MediaHeader';
import TraktActions from 'components/TraktActions';
import EpisodeList from 'components/EpisodeList';
import styles from 'styles/media-page.module.css';

const Season = ({ show, season }) => {
  const context = useAppContext();
  const [authenticated, setAuthenticated] = useState(context.isAuthenticated);

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

            {season.air_date !== null && <p>{season.air_date}</p>}

            {show.networks.map(network => (
              <span className='tag' key={network.id}>
                {network.name}{' '}
              </span>
            ))}
          </div>

          {authenticated && <TraktActions />}

          <p className={styles.overview}>{season.overview}</p>

          <EpisodeList show={show} season={season} episodes={season.episodes} />

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
