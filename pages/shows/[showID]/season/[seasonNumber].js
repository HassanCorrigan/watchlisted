import { tmdbFetch } from 'helpers/apiFetch.js';
import Layout from 'components/Layout.js';
import Poster from 'components/Poster.js';
import EpisodeList from 'components/EpisodeList.js';
import styles from 'styles/season.module.css';

const Season = ({ show, season }) => {
  // console.log(show);
  return (
    <Layout>
      <section>
        <header className={styles.header}>
          <h2 className={styles.title}>{season.name}</h2>
          <Poster media={season} />
        </header>
        <EpisodeList show={show} season={season} episodes={season.episodes} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const show = await tmdbFetch(`tv/${params.showID}`);

  const season = await tmdbFetch(
    `tv/${params.showID}/season/${params.seasonNumber}`
  );

  return {
    props: {
      show,
      season,
    },
  };
}

export default Season;
