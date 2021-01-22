import { createBannerPath } from 'helpers/createImagePath';
import Poster from 'components/Poster';

const MediaHeader = ({ title, banner, poster }) => {
  const styles = {
    header: {
      padding: '1em 0.5em',
      width: '100%',
      height: 'auto',
      backgroundImage: `url(${createBannerPath(banner)})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top',
      backgroundSize: 'cover',
    },
    title: {
      color: 'var(--main-background-color)',
      padding: '0.25em 0',
    },
  };

  return (
    <header style={styles.header}>
      <h2 style={styles.title}>{title}</h2>
      <Poster media={poster} />
    </header>
  );
};

export default MediaHeader;
