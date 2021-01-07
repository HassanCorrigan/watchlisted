import { tmdbFetch } from '../../helpers/apiFetch.js';

const Movie = ({ movie }) => {
  // console.log(movie);
  return (
    <div>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Update URL with smaller image size
        alt={movie.title}
      />
      <p>Released: {movie.release_date}</p>
    </div>
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
