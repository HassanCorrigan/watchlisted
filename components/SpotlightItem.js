import Link from 'next/link';
import { createBannerPath } from 'helpers/image-path';
import styles from 'styles/components/spotlight-item.module.css';

const SpotlightItem = ({ item, slug }) => {
  return (
    <Link href={`/${slug}/${item.id}`} className={styles.link}>
      <img
        className={styles.banner}
        src={createBannerPath(item.backdrop_path)}
        alt={item.title || item.name}
      />
      <h2 className={styles.title}>{item.title || item.name}</h2>
    </Link>
  );
};

export default SpotlightItem;
