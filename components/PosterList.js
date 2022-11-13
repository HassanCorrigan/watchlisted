import Link from 'next/link';
import Poster from 'components/Poster';
import styles from 'styles/components/poster-list.module.css';

const PosterList = ({ items, slug }) => {
  return (
    <div className={styles.posterList}>
      {items.map((item, index) => (
        <Link href={`/${slug}/${item.season_number || item.id}`} key={index}>
          <Poster media={item} />
          <p className={styles.posterTitle}>{item.name || item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default PosterList;
