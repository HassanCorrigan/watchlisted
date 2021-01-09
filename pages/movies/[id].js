import { tmdbFetch } from '../../helpers/apiFetch.js';
import Layout from '../../components/Layout.js';

const Movie = ({ movie }) => {
  // console.log(movie);
  return (
    <Layout>
      <section>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
        />
        <p>Released: {movie.release_date}</p>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const movie = await tmdbFetch(`movie/${params.id}`);

  return {
    props: {
      movie,
    },
  };
}

export default Movie;
