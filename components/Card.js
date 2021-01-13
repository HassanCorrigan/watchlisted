import Poster from './Poster.js';
import styles from 'styles/card.module.css';

const Card = ({ media }) => {
  // console.log(media);
  return (
    <div className={styles.card}>
      <Poster media={media} />
      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{media.title || media.name}</h3>
        <p className={styles.overview}>{media.overview}</p>
        <div className={styles.meta}>
          <span>
            &#11088; <b>{media.vote_average}</b> ({media.vote_count})
          </span>
          <span>Language: {media.original_language.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
