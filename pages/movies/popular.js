import Link from 'next/link';
import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const PopularMovies = ({ movies }) => {
  // console.log(movies);
  return (
    <Layout>
      <section className='page'>
        <h1>Popular Movies</h1>
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
  const movies = await tmdbFetch('movie/popular');

  return {
    props: {
      movies: movies.results,
    },
  };
}

export default PopularMovies;
