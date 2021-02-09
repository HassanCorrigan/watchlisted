import Link from 'next/link';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import Card from 'components/Card';
import styles from 'styles/media-page.module.css';

const TrendingMovies = ({ trendingMovies }) => {
  const { results, page } = trendingMovies;

  return (
    <Layout>
      <section>
        <h1 className='page-title'>Trending Movies</h1>
        <div className='page-container'>
          {results.map(movie => (
            <Card key={movie.id} media={movie} />
          ))}

          <div className={styles.pageNavigation}>
            {page !== 1 && (
              <Link href={`/movies/trending?page=${page - 1}`}>
                Previous Page
              </Link>
            )}
            <Link href={`/movies/trending?page=${page + 1}`}>Next Page</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const trendingMovies = await tmdbFetch('trending/movie/day', `page=${page}`);

  return {
    props: {
      trendingMovies,
    },
  };
}

export default TrendingMovies;
