import { useState } from 'react';
import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const Search = () => {
  const styles = {
    searchbox: {
      width: '100%',
      border: 'none',
      boxShadow: '0.1em 0.1em 0.8em var(--box-shadow-color)',
      borderRadius: 'var(--border-radius)',
      padding: '0.8em',
      margin: '1em 0',
      outline: 'none',
    },
  };

  const [searchText, setSearchText] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setSearchResults(results);
    setLoading(false);
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
          {loading && <p>Loading...</p>}
          {searchResults.map(item => (
            <Card key={item.id} media={item} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
