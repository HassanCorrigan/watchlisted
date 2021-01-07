import { tmdbFetch } from '../../helpers/apiFetch.js';

const PopularShows = ({ shows }) => {
  // console.log(shows);
  return (
    <section>
      <h1>Popular Shows</h1>
      <div>
        {shows.map(show => (
          <a href={`/shows/${show.id}`} key={show.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} // Update URL with smaller image size
              alt={show.name}
            />
            <p>{show.name}</p>
          </a>
        ))}
      </div>
    </section>
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