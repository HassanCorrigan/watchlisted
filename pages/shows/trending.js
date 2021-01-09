import { tmdbFetch } from '../../helpers/apiFetch.js';
import Layout from '../../components/Layout.js';

const TrendingShows = ({ shows }) => {
  // console.log(shows);
  return (
    <Layout>
      <section>
        <h1>Trending Shows</h1>
        <div>
          {shows.map(show => (
            <a href={`/shows/${show.id}`} key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${show.poster_path}`}
                alt={show.name}
              />
              <p>{show.name}</p>
            </a>
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
