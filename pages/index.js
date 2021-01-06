import Layout from '../components/Layout.js';
import TVShowList from '../components/TVShowList.js';
import MovieList from '../components/MovieList.js';
import { tmdbFetch } from '../helpers/apiFetch.js';

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

        <h2>Trending Shows</h2>
        <TVShowList shows={trendingShows} />

        <h2>Trending Movies</h2>
        <MovieList movies={trendingMovies} />

        <h2>Most Popular Shows</h2>
        <TVShowList shows={popularShows} />

        <h2>Most Popular Movies</h2>
        <MovieList movies={popularMovies} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const trendingShows = await tmdbFetch('trending/tv/day');
  const trendingMovies = await tmdbFetch('trending/movies/day'); // Fix issue where shows and movies are returned and no titles for some results
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
