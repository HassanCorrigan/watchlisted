import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { getList } from 'helpers/list';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Loader from 'components/Loader';
import RefreshButton from 'components/RefreshButton';
import MediaSortSelect from 'components/MediaSortSelect';
import MediaTypeSelect from 'components/MediaTypeSelect';
import Poster from 'components/Poster';
import styles from 'styles/lists.module.css';

const Watchlist = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('title');
  const [mediaType, setMediaType] = useState('show');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    setMediaType(localStorage.getItem('media-type') || 'show');

    user.authenticated &&
      (async () => {
        const list =
          JSON.parse(localStorage.getItem('watchlist')) || (await fetchList());
        setWatchlist(list);
        setLoading(false);
      })();
  }, []);

  const filterList = list => list.filter(item => item.type === mediaType);

  const sortList = (key, order = 'asc') => {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  const handleRefresh = async () => setWatchlist(await fetchList());

  const fetchList = async () => {
    const showWatchlist = await getList('watchlist/shows', user.token);
    const movieWatchlist = await getList('watchlist/movies', user.token);
    const watchlist = showWatchlist.concat(movieWatchlist);

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    return watchlist;
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Watchlist</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <div className={styles.controls}>
              <MediaSortSelect
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <RefreshButton updateList={handleRefresh} />
            </div>

            <MediaTypeSelect
              mediaType={mediaType}
              setMediaType={setMediaType}
            />

            <div className={styles.list}>
              {filterList(watchlist)
                .sort(sortList(sortOrder))
                .map((item, index) => (
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
