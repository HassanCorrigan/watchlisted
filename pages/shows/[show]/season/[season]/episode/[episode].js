import { tmdbFetch } from 'helpers/apiFetch.js';
import { isAuthenticated } from 'helpers/auth.js';
import { createBannerPath } from 'helpers/createImagePath.js';
import Layout from 'components/Layout.js';
import MediaHeader from 'components/MediaHeader.js';
import TraktActions from 'components/TraktActions.js';
import styles from 'styles/media-page.module.css';

const Season = ({ show, episode }) => {
  // console.log(show, episode);
  return (
    <Layout>
      <section>
        <MediaHeader
          title={episode.name}
          banner={show.backdrop_path}
          poster={show}
        />
        <div className={styles.info}>
          <p>
            Season {episode.season_number} - Episode {episode.episode_number}
          </p>
          <img
            className={styles.still}
            src={createBannerPath(episode.still_path)}
            alt={episode.name}
          />
          <p>
            Average Rating: &#11088; {episode.vote_average} (
            {episode.vote_count})
          </p>
          <p className={styles.overview}>{episode.overview}</p>
        </div>

        {isAuthenticated() && <TraktActions />}

        <div className={styles.meta}>
          {show.genres.map(genre => (
            <span className='tag' key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const show = await tmdbFetch(`tv/${params.show}`);

  const episode = await tmdbFetch(
    `tv/${params.show}/season/${params.season}/episode/${params.episode}`
  );

  return {
    props: {
      show,
      episode,
    },
  };
}

export default Season;
