import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { getList, updateList, sortList, filterList } from 'helpers/list';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Loader from 'components/Loader';
import RefreshButton from 'components/RefreshButton';
import MediaSortSelect from 'components/MediaSortSelect';
import MediaTypeSelect from 'components/MediaTypeSelect';
import Poster from 'components/Poster';
import styles from 'styles/pages/lists.module.css';

const Watchlist = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('watched');
  const [mediaType, setMediaType] = useState('show');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    setMediaType(localStorage.getItem('media-type') || 'show');

    user.authenticated &&
      (async () => {
        setHistory(await getList('history'));
        setLoading(false);
      })();
  }, []);

  const handleRefresh = async () => {
    setHistory(await updateList('history'));
  };

  return (
    <Layout>
      <section>
        <h1 className='page-title'>History</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <div className={styles.controls}>
              <MediaSortSelect
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                addedLabel='Watched'
              />
              <RefreshButton updateList={handleRefresh} />
            </div>

            <MediaTypeSelect
              mediaType={mediaType}
              setMediaType={setMediaType}
            />

            <div className={styles.list}>
              {filterList(history, mediaType)
                .sort(sortList(sortOrder, 'desc'))
                .map((item, index) => (
                  <Link href={item.slug} key={index}>
                    <Poster media={item.poster} />
                    <p>{item.title}</p>
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
