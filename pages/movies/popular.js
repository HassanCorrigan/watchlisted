import Link from 'next/link';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import Card from 'components/Card';
import styles from 'styles/media-page.module.css';

const PopularMovies = ({ popularMovies }) => {
  const { results, page } = popularMovies;

  return (
    <Layout>
      <section>
        <h1 className='page-title'>Popular Movies</h1>
        <div className='page-container'>
          {results.map(movie => (
            <Card key={movie.id} media={movie} />
          ))}

          <div className={styles.pageNavigation}>
            {page !== 1 && (
              <Link href={`/movies/popular?page=${page - 1}`}>
                Previous Page
              </Link>
            )}
            <Link href={`/movies/popular?page=${page + 1}`}>Next Page</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const popularMovies = await tmdbFetch('movie/popular', `page=${page}`);

  return {
    props: {
      popularMovies,
    },
  };
}

export default PopularMovies;
