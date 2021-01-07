import styles from '../styles/horizontal-poster-list.module.css';

const ShowList = ({ shows }) => {
  return (
    <div className={styles.posterList}>
      {shows.map(show => (
        <a href={`/shows/${show.id}`} key={show.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} // Update URL with smaller image size
            alt={show.name}
            className={styles.poster}
          />
          <p className={styles.posterTitle}>{show.name}</p>
        </a>
      ))}
    </div>
  );
};

export default ShowList;
