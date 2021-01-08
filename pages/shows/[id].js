import { tmdbFetch } from '../../helpers/apiFetch.js';
import Layout from '../../components/Layout.js';

const Show = ({ show }) => {
  // console.log(show);
  return (
    <Layout>
      <section>
        <h2>{show.name}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} // Update URL with smaller image size
          alt={show.name}
        />
        <p>Aired: {show.first_air_date}</p>
      </section>
    </Layout>
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
