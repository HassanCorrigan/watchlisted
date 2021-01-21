import Link from 'next/link';
import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const PopularShows = ({ shows }) => {
  return (
    <Layout>
      <section className='page'>
        <h1>Popular Shows</h1>
        <div>
          {shows.map(show => (
            <Link href={`/shows/${show.id}`} key={show.id}>
              <a>
                <Card media={show} />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const shows = await tmdbFetch('tv/popular');

  return {
    props: {
      shows: shows.results,
    },
  };
}

export default PopularShows;
