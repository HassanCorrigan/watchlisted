import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import Poster from 'components/Poster';
import TraktActions from 'components/TraktActions';
import styles from 'styles/card.module.css';

const Card = ({ media }) => {
  const { user } = useAppContext();
  const slug = media.media_type === 'tv' ? 'shows' : 'movies';

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(user.authenticated);
  });

  return (
    <Link href={`/${slug}/${media.id}`}>
      <a className={styles.card}>
        <Poster media={media} />
        <div className={styles.cardInfo}>
          <h2 className={styles.title}>{media.title || media.name}</h2>
          <p className={styles.overview}>{media.overview}</p>
          <div className={styles.meta}>
            <span>
              &#11088; <b>{media.vote_average}</b> ({media.vote_count})
            </span>
            <span>Language: {media.original_language?.toUpperCase()}</span>
          </div>
          {authenticated && <TraktActions />}
        </div>
      </a>
    </Link>
  );
};

export default Card;
