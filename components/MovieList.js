import styles from '../styles/horizontal-poster-list.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={styles.posterList}>
      {movies.map(movie => (
        <a href={`/movies/${movie.id}`} key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
          <p className={styles.posterTitle}>{movie.title}</p>
        </a>
      ))}
    </div>
  );
};

export default MovieList;
