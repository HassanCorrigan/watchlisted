import Link from 'next/link';
import Poster from 'components/Poster';
import styles from 'styles/poster-list.module.css';

const PosterList = ({ items, slug }) => {
  return (
    <div className={styles.posterList}>
      {items.map(item => (
        <Link href={`/${slug}/${item.season_number || item.id}`} key={item.id}>
          <a>
            <Poster media={item} />
            <p className={styles.posterTitle}>{item.name || item.title}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default PosterList;
