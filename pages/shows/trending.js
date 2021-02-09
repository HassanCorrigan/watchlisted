import Link from 'next/link';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import Card from 'components/Card';
import styles from 'styles/media-page.module.css';

const TrendingShows = ({ trendingShows }) => {
  const { results, page } = trendingShows;

  return (
    <Layout>
      <section>
        <h1 className='page-title'>Trending Shows</h1>
        <div className='page-container'>
          {results.map(show => (
            <Card key={show.id} media={show} />
          ))}

          <div className={styles.pageNavigation}>
            {page !== 1 && (
              <Link href={`/shows/trending?page=${page - 1}`}>
                Previous Page
              </Link>
            )}
            <Link href={`/shows/trending?page=${page + 1}`}>Next Page</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const trendingShows = await tmdbFetch('trending/tv/day', `page=${page}`);

  return {
    props: {
      trendingShows,
    },
  };
}

export default TrendingShows;
