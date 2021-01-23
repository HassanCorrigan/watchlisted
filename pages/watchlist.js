import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { traktFetch, tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Poster from 'components/Poster';
import styles from 'styles/watchlist.module.css';

const Watchlist = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState('show');
  const [sortBy, setSortBy] = useState('rank');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(async () => {
    setAuthenticated(user.authenticated);
    setWatchlist(await createList());
    setLoading(false);
  }, [mediaType]);

  const createList = async () => {
    const traktList = await traktFetch(
      `users/me/watchlist/${mediaType}s`,
      user.token
    );

    const tmdbList = await Promise.all(
      traktList.map(async item => {
        const media_type = item.show ? 'tv' : 'movie';
        const param = item.show ? item.show.ids.tmdb : item.movie.ids.tmdb;
        return await tmdbFetch(`${media_type}/${param}`);
      })
    );

    return tmdbList;
  };

  const handleChange = e => {
    setMediaType(e.target.value);
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Watchlist</h1>

        <div className={styles.mediaSelector}>
          <div className={styles.option}>
            <input
              type='radio'
              id='show'
              name='show'
              value='show'
              checked={mediaType === 'show'}
              onChange={handleChange}
            />
            <label htmlFor='show'>Shows</label>
          </div>
          <div className={styles.option}>
            <input
              type='radio'
              id='movie'
              name='movie'
              value='movie'
              checked={mediaType === 'movie'}
              onChange={handleChange}
            />
            <label htmlFor='movie'>Movies</label>
          </div>
        </div>
        {!authenticated ? (
          <LoginButton />
        ) : (
          <div className={styles.list}>
            {loading && <p>Loading...</p>}
            {watchlist.map(item => (
              <Link href={`${mediaType}s/${item.id}`} key={item.id}>
                <a>
                  <Poster media={item} />
                  <p>{item.name || item.title}</p>
                </a>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Watchlist;
