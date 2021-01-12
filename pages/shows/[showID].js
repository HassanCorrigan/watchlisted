import Link from 'next/link';
import { tmdbFetch } from 'helpers/apiFetch.js';
import { createPosterPath, createBannerPath } from 'helpers/createImagePath.js';
import Layout from 'components/Layout.js';
import SeasonList from 'components/SeasonList.js';
import styles from 'styles/show.module.css';

const Show = ({ show }) => {
  // console.log(show);
  return (
    <Layout>
      <section>
        <header
          style={{
            backgroundImage: `url(${createBannerPath(show.backdrop_path)})`,
          }}
          className={styles.header}>
          <h2 className={styles.title}>{show.name}</h2>
          <img
            src={createPosterPath(show.poster_path)}
            alt={show.name}
            className={styles.poster}
          />
        </header>

        <div className={styles.content}>
          <div className={styles.info}>
            <p>Run Time: {show.episode_run_time[0]} mins</p>
            <p>First Aired: {show.first_air_date.slice(0, 4)}</p>
            <p>
              Average Rating: <b>{show.vote_average}</b> ({show.vote_count}{' '}
              votes)
            </p>

            {show.next_episode_to_air !== null && (
              <div>{show.next_episode_to_air.air_date}</div>
            )}

            {show.networks.map(network => (
              <span className='tag' key={network.id}>
                {network.name}{' '}
              </span>
            ))}
          </div>

          <p className={styles.overview}>{show.overview}</p>

          <div className={styles.seasonOverview}>
            {show.number_of_seasons <= 1 ? (
              <h3>{show.number_of_seasons} Season</h3>
            ) : (
              <h3>{show.number_of_seasons} Seasons</h3>
            )}
            <SeasonList show={show} />
          </div>

          {show.last_episode_to_air && (
            <div className={styles.recentEpisode}>
              <h3>Latest Episode</h3>
              <Link
                href={`/shows/${show.id}/season/${show.last_episode_to_air.season_number}/episode/${show.last_episode_to_air.episode_number}`}>
                <img
                  src={createBannerPath(show.last_episode_to_air.still_path)}
                  alt={show.last_episode_to_air.name}
                  className={styles.still}
                />
              </Link>
            </div>
          )}

          <div className={styles.meta}>
            {show.genres.map(genre => (
              <span className='tag' key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const show = await tmdbFetch(`tv/${params.showID}`);

  return {
    props: {
      show,
    },
  };
}

export default Show;
