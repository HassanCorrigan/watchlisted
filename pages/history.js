import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { getList } from 'helpers/list';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Loader from 'components/Loader';
import Poster from 'components/Poster';
import styles from 'styles/lists.module.css';

const Watchlist = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [mediaType, setMediaType] = useState('show');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    setMediaType(localStorage.getItem('media-type') || 'show');

    user.authenticated &&
      (async () => {
        const showHistory = await getList('history/shows', user.token);
        const movieHistory = await getList('history/movies', user.token);
        const fullHistory = showHistory.concat(movieHistory);

        setHistory(fullHistory);
        setLoading(false);
      })();
  }, []);

  const filterItems = list =>
    list.filter(item => item.type === mediaType).map(({ media }) => media);

  const handleChange = e => {
    setMediaType(e.target.value);
    localStorage.setItem('media-type', e.target.value);
  };

  return (
    <Layout>
      <section className='page'>
        <h1>History</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
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
              {filterItems(history).map((item, index) => (
                <Link href={`${mediaType}s/${item.id}`} key={index}>
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
