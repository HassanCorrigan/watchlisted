import { tmdbFetch } from 'helpers/apiFetch.js';
import { createPosterPath } from 'helpers/createImagePath.js';
import Layout from 'components/Layout.js';

const PopularShows = ({ shows }) => {
  // console.log(shows);
  return (
    <Layout>
      <section>
        <h1>Popular Shows</h1>
        <div>
          {shows.map(show => (
            <a href={`/shows/${show.id}`} key={show.id}>
              <img src={createPosterPath(show.poster_path)} />
              <p>{show.name}</p>
            </a>
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
