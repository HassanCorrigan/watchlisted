import Link from 'next/link';
import { tmdbFetch } from '../../helpers/apiFetch.js';
import Layout from '../../components/Layout.js';
import styles from '../../styles/single-item.module.css';
import seasonStyles from '../../styles/horizontal-poster-list.module.css';

const Show = ({ show }) => {
  console.log(show);
  return (
    <Layout>
      <section
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${show.backdrop_path})`,
        }}
        className={styles.itemInfo}>
        <h2 className={styles.title}>{show.name}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`}
          alt={show.name}
          className={styles.poster}
        />
        <p>Run Time: {show.episode_run_time[0]} mins</p>
        <p>Aired: {show.first_air_date.slice(0, 4)}</p>
        <p>
          {show.networks.map(network => (
            <span className='tag' key={network.id}>
              {network.name}{' '}
            </span>
          ))}
        </p>

        <p>{show.overview}</p>

        <div className={styles.seasonsOverview}>
          {show.number_of_seasons <= 1 ? (
            <h3>{show.number_of_seasons} Season</h3>
          ) : (
            <p>{show.number_of_seasons} Seasons</p>
          )}
          <div className={seasonStyles.posterList}>
            {show.seasons.map(season => (
              <a href={`/shows/${show.id}/season/${season.id}`} key={season.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`}
                  alt={season.name}
                  className={seasonStyles.poster}
                />
                <p className={seasonStyles.posterTitle}>{season.name}</p>
              </a>
            ))}
          </div>
        </div>

        <p>
          {show.genres.map(genre => (
            <span className='tag' key={genre.id}>
              {genre.name}
            </span>
          ))}
        </p>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const show = await tmdbFetch(`tv/${params.id}`);

  return {
    props: {
      show,
    },
  };
}

export default Show;
