import { useEffect, useState } from 'react';
import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Card from 'components/Card';

const Search = () => {
  const styles = {
    searchbox: {
      color: 'var(--main-color)',
      backgroundColor: 'var(--secondary-background-color)',
      fontSize: '1em',
      width: '100%',
      border: 'none',
      boxShadow: '0.1em 0.1em 0.8em var(--box-shadow-color)',
      borderRadius: 'var(--border-radius)',
      padding: '0.8em',
      margin: '1em 0',
      outline: 'none',
    },
    searchHistory: {
      textAlign: 'center',
      color: 'var(--main-color)',
      filter: 'opacity(0.5)',
      padding: '0.5em 0',
    },
    searchHistoryResults: {
      padding: '1em 0',
    },
    searchHistoryItem: {
      padding: '0.25em',
      cursor: 'pointer',
    },
  };

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const localStorageHistory = JSON.parse(
      localStorage.getItem('search-history')
    );
    setSearchHistory(localStorageHistory || []);
  }, []);

  const handleInput = async e => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (!searchText) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const { results } = await tmdbFetch('search/multi', searchText);
    const filteredResults = results.filter(
      item => item.media_type !== 'person'
    );
    setSearchResults(filteredResults);

    const history = [...searchHistory, searchText].slice(0, 10).reverse();
    setSearchHistory(history);
    localStorage.setItem('search-history', JSON.stringify(history));

    setLoading(false);
  };

  const handleClick = async e => {
    setSearchText(e.target.innerText);
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Search TV Shows and Movies</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={handleInput}
            style={styles.searchbox}
            type='text'
            placeholder='Search...'
          />
        </form>
        <div>
          {loading && <Loader />}
          {searchResults.length === 0 && searchHistory.length !== 0 && (
            <div style={styles.searchHistory} onClick={handleClick}>
              <h2>Previous Searches</h2>
              <div style={styles.searchHistoryResults}>
                {searchHistory.map((item, index) => (
                  <p style={styles.searchHistoryItem} key={index}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}
          {searchResults.map((item, index) => (
            <Card key={index} media={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
