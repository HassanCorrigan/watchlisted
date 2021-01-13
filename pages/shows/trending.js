import Link from 'next/link';
import { tmdbFetch } from 'helpers/apiFetch.js';
import Layout from 'components/Layout.js';
import Card from 'components/Card.js';

const TrendingShows = ({ shows }) => {
  // console.log(shows);
  return (
    <Layout>
      <section className='page'>
        <h1>Trending Shows</h1>
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
  const shows = await tmdbFetch('trending/tv/day');

  return {
    props: {
      shows: shows.results,
    },
  };
}

export default TrendingShows;
