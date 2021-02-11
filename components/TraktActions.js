import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { traktPost } from 'helpers/api';
import styles from 'styles/components/trakt-actions.module.css';

const TraktActions = ({ media }) => {
  const { user } = useAppContext();
  const [watched, setWatched] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const collection = JSON.parse(localStorage.getItem('collection')) || [];

    setWatched(history.some(value => value.poster.id === media.id));
    setWatchlisted(watchlist.some(value => value.poster.id === media.id));
    setCollected(collection.some(value => value.poster.id === media.id));
  }, []);

  const updateHistory = async () => {
    console.log(media);
  };
  const updateWatchlist = async () => {
    console.log(media);
  };
  const updateCollection = async () => {
    console.log(media);
    const params = collected ? 'sync/collection/remove' : 'sync/collection';
    const res = await traktPost(params, { movies: [media] }, user.token);
    setCollected(res.added ? true : false);
  };

  return (
    <div className={`card ${styles.actions}`}>
      <button
        className={styles.action}
        onClick={updateHistory}
        active={watched.toString()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M8 12.5l3 3 5-6' />
          <circle cx='12' cy='12' r='10' />
        </svg>
        <span>{watched ? 'Remove from watched' : 'Mark as watched'}</span>
      </button>
      <button
        className={styles.action}
        onClick={updateWatchlist}
        active={watchlisted.toString()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M12 8v4m0 0v4m0-4h4m-4 0H8' />
          <circle cx='12' cy='12' r='10' />
        </svg>
        <span>
          {watchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
        </span>
      </button>
      <button
        className={styles.action}
        onClick={updateCollection}
        active={collected.toString()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M4 5v14.586c0 .89 1.077 1.337 1.707.707L12 14l6.293 6.293c.63.63 1.707.184 1.707-.707V5a2 2 0 00-2-2H6a2 2 0 00-2 2z' />
        </svg>
        <span>
          {collected ? 'Remove from collection' : 'Add to collection'}
        </span>
      </button>
    </div>
  );
};

export default TraktActions;
