import { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import { tmdbFetch } from 'helpers/apiFetch';
import { createBannerPath } from 'helpers/createImagePath';
import Layout from 'components/Layout';
import MediaHeader from 'components/MediaHeader';
import TraktActions from 'components/TraktActions';
import styles from 'styles/media-page.module.css';

const Season = ({ show, episode }) => {
  const context = useAppContext();
  const [authenticated, setAuthenticated] = useState(context.isAuthenticated);

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

        {authenticated && <TraktActions />}

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
