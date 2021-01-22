import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const TrendingMovies = ({ movies }) => {
  return (
    <Layout>
      <section className='page'>
        <h1>Trending Movies</h1>
        <div>
          {movies.map(movie => (
            <Card key={movie.id} media={movie} />
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
