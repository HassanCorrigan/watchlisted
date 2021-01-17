import Link from 'next/link';
import Poster from 'components/Poster';
import styles from 'styles/horizontal-poster-list.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={styles.posterList}>
      {movies.map(movie => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <a>
            <Poster media={movie} />
            <p className={styles.posterTitle}>{movie.title}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
