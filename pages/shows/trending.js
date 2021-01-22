import { tmdbFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Card from 'components/Card';

const TrendingShows = ({ shows }) => {
  return (
    <Layout>
      <section className='page'>
        <h1>Trending Shows</h1>
        <div>
          {shows.map(show => (
            <Card key={show.id} media={show} />
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
