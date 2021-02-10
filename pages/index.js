import Link from 'next/link';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import SpotlightItem from 'components/SpotlightItem';
import PosterList from 'components/PosterList';
import styles from 'styles/pages/index.module.css';

const Home = ({
  trendingShows,
  trendingMovies,
  popularShows,
  popularMovies,
}) => {
  const spotlightShow = trendingShows[0];
  const spotlightMovie = trendingMovies[0];

  return (
    <Layout>
      <section className={styles.welcome}>
        <h1>Spotlight</h1>
        <div className={styles.content}>
          <SpotlightItem item={spotlightShow} slug='shows' />
          <SpotlightItem item={spotlightMovie} slug='movies' />
        </div>
      </section>

      <section className={styles.discover}>
        <h1>Discover</h1>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Trending Shows</h2>
            <Link href='/shows/trending'>See More &#8250;</Link>
          </div>
          <PosterList items={trendingShows} slug='shows' />
        </div>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Trending Movies</h2>
            <Link href='/movies/trending'>See More &#8250;</Link>
          </div>
          <PosterList items={trendingMovies} slug='movies' />
        </div>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Most Popular Shows</h2>
            <Link href='/shows/popular'>See More &#8250;</Link>
          </div>
          <PosterList items={popularShows} slug='shows' />
        </div>

        <div className={styles.horizontalList}>
          <div className={styles.horizontalListHeader}>
            <h2>Most Popular Movies</h2>
            <Link href='/movies/popular'>See More &#8250;</Link>
          </div>
          <PosterList items={popularMovies} slug='movies' />
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
