import Link from 'next/link';
import Layout from 'components/Layout.js';
import ShowList from 'components/ShowList.js';
import MovieList from 'components/MovieList.js';
import { tmdbFetch } from 'helpers/apiFetch.js';
import styles from 'styles/index.module.css';

const Home = ({
  trendingShows,
  trendingMovies,
  popularShows,
  popularMovies,
}) => {
  return (
    <Layout>
      <section>
        <h1>Welcome</h1>
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
