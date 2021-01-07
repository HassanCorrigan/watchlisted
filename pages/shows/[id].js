import { tmdbFetch } from '../../helpers/apiFetch.js';

const Show = ({ show }) => {
  // console.log(show);
  return (
    <div>
      <h2>{show.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} // Update URL with smaller image size
        alt={show.name}
      />
      <p>Aired: {show.first_air_date}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const show = await tmdbFetch(`tv/${params.id}`);

  return {
    props: {
      show,
    },
  };
}

export default Show;
