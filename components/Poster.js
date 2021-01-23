import { createPosterPath } from 'helpers/createImagePath';

const Poster = ({ media }) => {
  const styles = {
    poster: {
      height: '12em',
      borderRadius: 'var(--border-radius)',
      margin: '0 0.25em',
    },
  };

  return (
    <img
      src={createPosterPath(media.poster_path)}
      alt={media.title || media.name}
      style={styles.poster}
    />
  );
};

export default Poster;
