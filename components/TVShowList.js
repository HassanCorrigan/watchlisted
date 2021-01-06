import styles from '../styles/tvshow-list.module.css';

const TVShowList = ({ shows }) => {
  return (
    <div className={styles.tvlist}>
      {shows.map(show => (
        <div key={show.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} // Update URL with smaller image size
            alt={show.title}
            className={styles.poster}
          />
          <p>{show.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TVShowList;
