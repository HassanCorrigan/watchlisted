import Link from 'next/link';
import { tmdbFetch } from 'helpers/apiFetch.js';
import Layout from 'components/Layout.js';
import Card from 'components/Card.js';

const PopularShows = ({ shows }) => {
  // console.log(shows);
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
