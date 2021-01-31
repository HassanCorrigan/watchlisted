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

const Collection = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('title');
  const [mediaType, setMediaType] = useState('show');
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    setMediaType(localStorage.getItem('media-type') || 'show');

    user.authenticated &&
      (async () => {
        const list =
          JSON.parse(localStorage.getItem('collection')) || (await fetchList());
        setCollection(list);
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

  const handleRefresh = async () => {
    setCollection(await fetchList());
  };

  const fetchList = async () => {
    const showCollection = await getList('collection/shows', user.token);
    const movieCollection = await getList('collection/movies', user.token);
    const collection = showCollection.concat(movieCollection);

    localStorage.setItem('collection', JSON.stringify(collection));
    return collection;
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Collection</h1>

        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <div className={styles.controls}>
              <MediaSortSelect
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                addedLabel='Collected'
              />
              <RefreshButton updateList={handleRefresh} />
            </div>

            <MediaTypeSelect
              mediaType={mediaType}
              setMediaType={setMediaType}
            />

            <div className={styles.list}>
              {filterList(collection)
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

export default Collection;
