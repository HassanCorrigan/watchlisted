import Link from 'next/link';
import { createPosterPath } from 'helpers/createImagePath.js';
import styles from 'styles/horizontal-poster-list.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={styles.posterList}>
      {movies.map(movie => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <a>
            <img
              src={createPosterPath(movie.poster_path)}
              alt={movie.title}
              className={styles.poster}
            />
            <p className={styles.posterTitle}>{movie.title}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
