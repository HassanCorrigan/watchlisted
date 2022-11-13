import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { getList, updateList, filterList } from 'helpers/list';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Loader from 'components/Loader';
import RefreshButton from 'components/RefreshButton';
import MediaTypeSelect from 'components/MediaTypeSelect';
import Poster from 'components/Poster';
import styles from 'styles/pages/lists.module.css';

const Watchlist = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);
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
        setWatchlist(await getList('watchlist'));
        setCollection(await getList('collection'));
        setHistory(await getList('history'));
        setLoading(false);
      })();
  }, []);

  const handleRefresh = async () => {
    setWatchlist(await updateList('watchlist'));
    setCollection(await updateList('collection'));
    setHistory(await updateList('history'));
  };

  return (
    <Layout>
      <section>
        <h1 className='page-title'>Lists</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <div className={styles.controls}>
              <RefreshButton updateList={handleRefresh} />
            </div>

            <MediaTypeSelect
              mediaType={mediaType}
              setMediaType={setMediaType}
            />

            <div className={styles.horizontalList}>
              <div className={styles.horizontalListHeader}>
                <h2>Watchlist</h2>
                <Link href='/watchlist'>See More &#8250;</Link>
              </div>
              <div className={styles.posterList}>
                {filterList(watchlist, mediaType)
                  .slice(0, 10)
                  .map((item, index) => (
                    <Link href={item.slug} key={index}>
                      <Poster media={item.poster} />
                      <p className={styles.posterTitle}>{item.title}</p>
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
                {filterList(collection, mediaType)
                  .slice(0, 10)
                  .map((item, index) => (
                    <Link href={item.slug} key={index}>
                      <Poster media={item.poster} />
                      <p className={styles.posterTitle}>{item.title}</p>
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
                {filterList(history, mediaType)
                  .slice(0, 10)
                  .map((item, index) => (
                    <Link href={item.slug} key={index}>
                      <Poster media={item.poster} />
                      <p className={styles.posterTitle}>{item.title}</p>
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
