import { tmdbFetch } from '../../helpers/apiFetch.js';

const PopularMovies = ({ movies }) => {
  // console.log(movies);
  return (
    <section>
      <h1>Popular Movies</h1>
      <div>
        {movies.map(movie => (
          <a href={`/movies/${movie.id}`} key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Update URL with smaller image size
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export async function getServerSideProps() {
  const movies = await tmdbFetch('movie/popular');

  return {
    props: {
      movies: movies.results,
    },
  };
}

export default PopularMovies;
