import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { getList } from 'helpers/list';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Loader from 'components/Loader';
import RefreshButton from 'components/RefreshButton';
import MediaTypeSelect from 'components/MediaTypeSelect';
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
        const list =
          JSON.parse(localStorage.getItem('history')) || (await fetchList());
        setHistory(list);
        setLoading(false);
      })();
  }, []);

  const filterItems = list => list.filter(item => item.type === mediaType);

  const handleRefresh = async () => {
    setHistory(await fetchList());
  };

  const fetchList = async () => {
    const showHistory = await getList('history/shows', user.token);
    const movieHistory = await getList('history/movies', user.token);
    const history = showHistory.concat(movieHistory);

    localStorage.setItem('history', JSON.stringify(history));
    return history;
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
            <div className={styles.controls}>
              <RefreshButton updateList={handleRefresh} />
            </div>

            <MediaTypeSelect
              mediaType={mediaType}
              setMediaType={setMediaType}
            />

            <div className={styles.list}>
              {filterItems(history).map((item, index) => (
                <Link href={item.slug} key={index}>
                  <a>
                    <Poster media={item.poster} />
                    <p>{item.title}</p>
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
