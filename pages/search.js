import { useEffect, useState } from 'react';
import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Card from 'components/Card';
import styles from 'styles/search.module.css';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const localStorageHistory = JSON.parse(
      localStorage.getItem('search-history')
    );
    setSearchHistory(localStorageHistory || []);
  }, []);

  useEffect(() => {
    runSearch();
  }, [searchText]);

  const handleSearchSubmit = async e => {
    e.preventDefault();
    setSearchText(inputValue);
  };

  const handleHistoryClick = e => {
    setInputValue(e.target.innerText);
    setSearchText(e.target.innerText);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search-history');
  };

  const runSearch = async () => {
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

  return (
    <Layout>
      <section className='page'>
        <h1>Search TV Shows and Movies</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            className={styles.searchbox}
            type='text'
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
            placeholder='Search...'
          />
        </form>
        <div>
          {loading && <Loader />}

          {searchResults.length === 0 && searchHistory.length !== 0 && (
            <div className={styles.searchHistory}>
              <h2>Previous Searches</h2>
              <div
                className={styles.searchHistoryResults}
                onClick={handleHistoryClick}>
                {searchHistory.map((item, index) => (
                  <p className={styles.searchHistoryItem} key={index}>
                    {item}
                  </p>
                ))}
              </div>
              <button onClick={handleClearHistory} className={styles.clearBtn}>
                Clear History
              </button>
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
