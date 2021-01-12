import { tmdbFetch } from 'helpers/apiFetch.js';
import { createBannerPath } from 'helpers/createImagePath.js';
import Layout from 'components/Layout.js';
import styles from 'styles/episode.module.css';

const Season = ({ episode }) => {
  // console.log(episode);
  return (
    <Layout>
      <section>
        <header>
          <img
            src={createBannerPath(episode.still_path)}
            alt={episode.name}
            className={styles.still}
          />
          <h2>{episode.name}</h2>
          <div className={styles.info}>
            <p>
              Season {episode.season_number} - Episode {episode.episode_number}
            </p>
            <p>
              Average Votes: {episode.vote_average} ({episode.vote_count})
            </p>
            <p className={styles.overview}>{episode.overview}</p>
          </div>
        </header>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const episode = await tmdbFetch(
    `tv/${params.showID}/season/${params.seasonNumber}/episode/${params.episodeNumber}`
  );

  return {
    props: {
      episode,
    },
  };
}

export default Season;
