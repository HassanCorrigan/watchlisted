import Link from 'next/link';
import { tmdbFetch } from 'helpers/apiFetch.js';
import Layout from 'components/Layout.js';
import Card from 'components/Card.js';

const TrendingMovies = ({ movies }) => {
  // console.log(movies);
  return (
    <Layout>
      <section className='page'>
        <h1>Trending Movies</h1>
        <div>
          {movies.map(movie => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <a>
                <Card media={movie} />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const movies = await tmdbFetch('trending/movie/day');

  return {
    props: {
      movies: movies.results,
    },
  };
}

export default TrendingMovies;
