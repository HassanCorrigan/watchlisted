import Layout from '../components/Layout.js';

const Home = ({ data }) => {
  const movies = data;

  return (
    <Layout>
      <h1>Home</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.movie.ids.trakt}>{movie.movie.title}</li>
        ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.trakt.tv/movies/trending`, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': `${process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID}`,
    },
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
