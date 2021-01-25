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
    user.authenticated &&
      (async () => {
        const showList = await getList('collection/shows', user.token);
        const movieList = await getList('collection/movies', user.token);
        const list = showList.concat(movieList);
        setCollection(list);
        setLoading(false);
      })();
  }, []);

  const filterItems = list =>
    list.filter(item => item.type === mediaType).map(({ media }) => media);

  const handleChange = e => setMediaType(e.target.value);

  return (
    <Layout>
      <section className='page'>
        <h1>Collection</h1>

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
            {loading && <Loader />}
            <div className={styles.list}>
              {filterItems(collection).map(item => (
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

export default Collection;
