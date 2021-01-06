import styles from '../styles/movie-list.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={styles.movielist}>
      {movies.map(movie => (
        <div key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Update URL with smaller image size
            alt={movie.title}
            className={styles.poster}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
