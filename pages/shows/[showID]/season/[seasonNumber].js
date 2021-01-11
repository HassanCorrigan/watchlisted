import { tmdbFetch } from '../../../../helpers/apiFetch.js';
import { createPosterPath } from '../../../../helpers/createImagePath.js';
import Layout from '../../../../components/Layout.js';
import EpisodeList from '../../../../components/EpisodeList.js';
import styles from '../../../../styles/season.module.css';

const Season = ({ season }) => {
  // console.log(season);
  return (
    <Layout>
      <section>
        <header className={styles.header}>
          <h2 className={styles.title}>{season.name}</h2>
          <img
            className={styles.poster}
            src={createPosterPath(season.poster_path)}
            alt={season.name}
          />
        </header>
        <EpisodeList episodes={season.episodes} />
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  // console.log(params);
  const season = await tmdbFetch(
    `tv/${params.showID}/season/${params.seasonNumber}`
  );

  return {
    props: {
      season,
    },
  };
}

export default Season;
