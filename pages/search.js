import { useEffect, useState } from 'react';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Card from 'components/Card';
import styles from 'styles/pages/search.module.css';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resultsPage, setResultsPage] = useState(1);
  const [totalResultsPages, setTotalResultsPages] = useState(0);
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
    setResultsPage(1);
  };

  const handleHistoryClick = e => {
    setInputValue(e.target.innerText);
    setSearchText(e.target.innerText);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search-history');
  };

  const handleLoadMore = async () => {
    setLoading(true);

    const { results, page } = await tmdbFetch(
      'search/multi',
      `query=${searchText}&page=${resultsPage + 1}`
    );
    const filteredResults = results.filter(
      item => item.media_type !== 'person'
    );
    const newResults = searchResults.concat(filteredResults);
    setSearchResults(newResults);
    setResultsPage(page);
    setLoading(false);
  };

  const runSearch = async () => {
    setLoading(true);

    if (!searchText) {
      setSearchResults([]);
      setTotalResultsPages(0);
      setLoading(false);
      return;
    }

    const { results, total_pages } = await tmdbFetch(
      'search/multi',
      `query=${searchText}&page=${resultsPage}`
    );
    const filteredResults = results.filter(
      item => item.media_type !== 'person'
    );
    setSearchResults(filteredResults);
    setTotalResultsPages(total_pages);

    const history = [...searchHistory, searchText].slice(0, 10).reverse();
    setSearchHistory(history);
    localStorage.setItem('search-history', JSON.stringify(history));

    setLoading(false);
  };

  return (
    <Layout>
      <section>
        <h1 className='page-title'>Search Movies and Shows</h1>
        <div className={styles.container}>
          <form onSubmit={handleSearchSubmit}>
            <input
              className={styles.searchbox}
              type='text'
              value={inputValue}
              onInput={e => {
                setInputValue(e.target.value);
              }}
              aria-label='Search'
              placeholder='Search...'
            />
          </form>
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
          {searchResults.length !== 0 && resultsPage !== totalResultsPages && (
            <button
              className={`card ${styles.loadMoreBtn}`}
              onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
