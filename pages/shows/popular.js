import Link from 'next/link';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import Card from 'components/Card';
import styles from 'styles/media-page.module.css';

const PopularShows = ({ popularShows }) => {
  const { results, page } = popularShows;

  return (
    <Layout>
      <section>
        <h1 className='page-title'>Popular Shows</h1>
        <div className='page-container'>
          {results.map(show => (
            <Card key={show.id} media={show} />
          ))}

          <div className={styles.pageNavigation}>
            {page !== 1 && (
              <Link href={`/shows/popular?page=${page - 1}`}>
                Previous Page
              </Link>
            )}
            <Link href={`/shows/popular?page=${page + 1}`}>Next Page</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const popularShows = await tmdbFetch('tv/popular', `page=${page}`);

  return {
    props: {
      popularShows,
    },
  };
}

export default PopularShows;
