import Link from 'next/link';
import { createBannerPath } from 'helpers/createImagePath';

const SpotlightItem = ({ item, slug }) => {
  const styles = {
    banner: {
      width: '90vw',
      margin: '0 0.25em',
      borderRadius: 'var(--border-radius)',
    },
    link: {
      margin: '0.25em',
      position: 'relative',
    },
    title: {
      color: 'var(--main-color)',
      padding: '0 0.25em',
    },
  };

  return (
    <Link href={`/${slug}/${item.id}`}>
      <a style={styles.link}>
        <img
          style={styles.banner}
          src={createBannerPath(item.backdrop_path)}
          alt={item.name}
        />
        <h2 style={styles.title}>{item.title || item.name}</h2>
      </a>
    </Link>
  );
};

export default SpotlightItem;
