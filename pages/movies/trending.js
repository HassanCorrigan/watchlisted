import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const TrendingMovies = ({ movies }) => {
  return (
    <Layout>
      <section>
        <h1 className='page-title'>Trending Movies</h1>
        <div className='page-container'>
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
