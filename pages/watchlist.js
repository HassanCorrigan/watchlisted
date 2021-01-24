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
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    user.authenticated && createWatchlist();
  }, []);

  const createWatchlist = async () => {
    const traktList = await traktFetch(`users/me/watchlist`, user.token);
    const tmdbList = await Promise.all(
      traktList.map(async item => {
        const param = item.type === 'show' ? 'tv' : 'movie';
        const id =
          item.type === 'show' ? item.show.ids.tmdb : item.movie.ids.tmdb;

        const media = await tmdbFetch(`${param}/${id}`);

        return {
          type: item.type,
          media,
        };
      })
    );

    setWatchlist(await tmdbList);
    setLoading(false);
  };

  const handleChange = e => {
    setMediaType(e.target.value);
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Watchlist</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
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
            <div className={styles.list}>
              {loading && <p>Loading...</p>}
              {watchlist
                .filter(item => item.type === mediaType)
                .map(({ media: item }) => (
                  <Link href={`${mediaType}s/${item.id}`} key={item.id}>
                    <a>
                      <Poster media={item} />
                      <p>{item.name || item.title}</p>
                    </a>
                  </Link>
                ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Watchlist;
