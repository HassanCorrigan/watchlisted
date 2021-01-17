import Link from 'next/link';
import { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import ShowList from 'components/ShowList';
import MovieList from 'components/MovieList';
import { tmdbFetch } from 'helpers/apiFetch';
import styles from 'styles/index.module.css';

const Home = ({
  trendingShows,
  trendingMovies,
  popularShows,
  popularMovies,
}) => {
  const context = useAppContext();
  const [authenticated, setAuthenticated] = useState(context.isAuthenticated);

  return (
    <Layout>
      <section className={styles.welcome}>
        <h1>Welcome</h1>
        <div className={styles.content}>
          {!authenticated && <LoginButton />}
        </div>
      </section>

      <section>
        <h1>Discover</h1>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Trending Shows</h2>
            <Link href='/shows/trending'>See More &#8250;</Link>
          </div>
          <ShowList shows={trendingShows} />
        </div>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Trending Movies</h2>
            <Link href='/movies/trending'>See More &#8250;</Link>
          </div>
          <MovieList movies={trendingMovies} />
        </div>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Most Popular Shows</h2>
            <Link href='/shows/popular'>See More &#8250;</Link>
          </div>
          <ShowList shows={popularShows} />
        </div>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Most Popular Movies</h2>
            <Link href='/movies/popular'>See More &#8250;</Link>
          </div>
          <MovieList movies={popularMovies} />
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const trendingShows = await tmdbFetch('trending/tv/day');
  const trendingMovies = await tmdbFetch('trending/movie/day');
  const popularShows = await tmdbFetch('tv/popular');
  const popularMovies = await tmdbFetch('movie/popular');

  return {
    props: {
      trendingShows: trendingShows.results,
      trendingMovies: trendingMovies.results,
      popularShows: popularShows.results,
      popularMovies: popularMovies.results,
    },
  };
}

export default Home;
