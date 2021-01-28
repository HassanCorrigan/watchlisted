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
  const [watchlist, setWatchlist] = useState([]);
  const [collection, setCollection] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    setMediaType(localStorage.getItem('media-type') || 'show');

    user.authenticated &&
      (async () => {
        const watchlist =
          JSON.parse(localStorage.getItem('watchlist')) ||
          (await fetchList('watchlist'));
        const collection =
          JSON.parse(localStorage.getItem('collection')) ||
          (await fetchList('collection'));
        const history =
          JSON.parse(localStorage.getItem('history')) ||
          (await fetchList('watchlist'));

        setWatchlist(watchlist);
        setCollection(collection);
        setHistory(history);
        setLoading(false);
      })();
  }, []);

  const filterItems = list => list.filter(item => item.type === mediaType);

  const handleChange = e => {
    setMediaType(e.target.value);
    localStorage.setItem('media-type', e.target.value);
  };

  const handleRefresh = async () => {
    setWatchlist(await fetchList('watchlist'));
    setCollection(await fetchList('collection'));
    setHistory(await fetchList('history'));
  };

  const fetchList = async listType => {
    const showList = await getList(`${listType}/shows`, user.token);
    const movieList = await getList(`${listType}/movies`, user.token);
    const list = showList.concat(movieList);

    localStorage.setItem(`${listType}`, JSON.stringify(list));
    return list;
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Lists</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <button onClick={handleRefresh}>Refresh</button>
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

            <div className={styles.horizontalList}>
              <div className={styles.horizontalListHeader}>
                <h2>Watchlist</h2>
                <Link href='/watchlist'>See More &#8250;</Link>
              </div>
              <div className={styles.posterList}>
                {filterItems(watchlist).map((item, index) => (
                  <Link href={item.slug} key={index}>
                    <a>
                      <Poster media={item.poster} />
                      <p className={styles.posterTitle}>{item.title}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.horizontalList}>
              <div className={styles.horizontalListHeader}>
                <h2>Collection</h2>
                <Link href='/collection'>See More &#8250;</Link>
              </div>
              <div className={styles.posterList}>
                {filterItems(collection).map((item, index) => (
                  <Link href={item.slug} key={index}>
                    <a>
                      <Poster media={item.poster} />
                      <p className={styles.posterTitle}>{item.title}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.horizontalList}>
              <div className={styles.horizontalListHeader}>
                <h2>History</h2>
                <Link href='/history'>See More &#8250;</Link>
              </div>
              <div className={styles.posterList}>
                {filterItems(history).map((item, index) => (
                  <Link href={item.slug} key={index}>
                    <a>
                      <Poster media={item.poster} />
                      <p className={styles.posterTitle}>{item.title}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Watchlist;
