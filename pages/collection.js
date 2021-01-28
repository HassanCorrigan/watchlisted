import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { getList } from 'helpers/list';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import Loader from 'components/Loader';
import Poster from 'components/Poster';
import styles from 'styles/lists.module.css';

const Collection = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
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

  const filterItems = list => list.filter(item => item.type === mediaType);

  const handleChange = e => {
    setMediaType(e.target.value);
    localStorage.setItem('media-type', e.target.value);
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

            <div className={styles.list}>
              {filterItems(collection).map((item, index) => (
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
