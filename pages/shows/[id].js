import { tmdbFetch } from '../../helpers/apiFetch.js';
import Layout from '../../components/Layout.js';
import styles from '../../styles/single-item.module.css';

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
        <p>Aired: {show.first_air_date}</p>
        {show.networks.map(network => (
          <p key={network.id}>{network.name}</p>
        ))}

        {show.number_of_seasons <= 1 ? (
          <p>{show.number_of_seasons} Season</p>
        ) : (
          <p>{show.number_of_seasons} Seasons</p>
        )}

        <p>{show.overview}</p>

        <p>
          {show.genres.map(genre => (
            <span key={genre.id}>{genre.name} </span>
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
