import Link from 'next/link';
import Poster from 'components/Poster';
import styles from 'styles/horizontal-poster-list.module.css';

const ShowList = ({ shows }) => {
  return (
    <div className={styles.posterList}>
      {shows.map(show => (
        <Link href={`/shows/${show.id}`} key={show.id}>
          <a>
            <Poster media={show} />
            <p className={styles.posterTitle}>{show.name}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ShowList;
