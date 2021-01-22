import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const PopularMovies = ({ movies }) => {
  return (
    <Layout>
      <section className='page'>
        <h1>Popular Movies</h1>
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
  const movies = await tmdbFetch('movie/popular');

  return {
    props: {
      movies: movies.results,
    },
  };
}

export default PopularMovies;
