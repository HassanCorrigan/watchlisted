import { tmdbFetch } from 'helpers/apiFetch.js';
import { createPosterPath } from 'helpers/createImagePath.js';
import Layout from 'components/Layout.js';

const Movie = ({ movie }) => {
  // console.log(movie);
  return (
    <Layout>
      <section>
        <h2>{movie.title}</h2>
        <img src={createPosterPath(movie.poster_path)} alt={movie.title} />
        <p>Released: {movie.release_date}</p>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const movie = await tmdbFetch(`movie/${params.movieID}`);

  return {
    props: {
      movie,
    },
  };
}

export default Movie;
