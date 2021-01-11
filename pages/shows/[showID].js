import { tmdbFetch } from '../../helpers/apiFetch.js';
import {
  createPosterPath,
  createBackdropPath,
} from '../../helpers/createImagePath.js';
import Layout from '../../components/Layout.js';
import SeasonList from '../../components/SeasonList.js';
import styles from '../../styles/single-item.module.css';

const Show = ({ show }) => {
  console.log(show);
  return (
    <Layout>
      <section>
        <header
          style={{
            backgroundImage: `url(${createBackdropPath(show.backdrop_path)})`,
          }}
          className={styles.header}>
          <h2 className={styles.title}>{show.name}</h2>
          <img
            src={createPosterPath(show.poster_path)}
            alt={show.name}
            className={styles.poster}
          />
        </header>

        <div className={styles.content}>
          <div className={styles.info}>
            <p>Run Time: {show.episode_run_time[0]} mins</p>
            <p>Aired: {show.first_air_date.slice(0, 4)}</p>

            {show.next_episode_to_air !== null && (
              <div>{show.next_episode_to_air.air_date}</div>
            )}

            {show.networks.map(network => (
              <span className='tag' key={network.id}>
                {network.name}{' '}
              </span>
            ))}
          </div>

          <p className={styles.overview}>{show.overview}</p>

          <SeasonList show={show} seasons={show.seasons} />

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
  const show = await tmdbFetch(`tv/${params.showID}`);

  return {
    props: {
      show,
    },
  };
}

export default Show;
