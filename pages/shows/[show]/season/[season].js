import { tmdbFetch } from 'helpers/apiFetch.js';
import { isAuthenticated } from 'helpers/auth.js';
import Layout from 'components/Layout.js';
import MediaHeader from 'components/MediaHeader.js';
import TraktActions from 'components/TraktActions.js';
import EpisodeList from 'components/EpisodeList.js';
import styles from 'styles/media-page.module.css';

const Season = ({ show, season }) => {
  // console.log(season);
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

          {isAuthenticated() && <TraktActions />}

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
