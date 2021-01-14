import { tmdbFetch } from 'helpers/apiFetch.js';
import { isAuthenticated } from 'helpers/auth.js';
import Layout from 'components/Layout.js';
import MediaHeader from 'components/MediaHeader.js';
import TraktActions from 'components/TraktActions.js';
import styles from 'styles/media-page.module.css';

const Movie = ({ movie }) => {
  // console.log(movie);
  return (
    <Layout>
      <section>
        <MediaHeader
          title={movie.title}
          banner={movie.backdrop_path}
          poster={movie}
        />

        <div className={styles.content}>
          <div className={styles.info}>
            <p>Run Time: {movie.runtime} mins</p>
            <p>Release: {movie.release_date.slice(0, 4)}</p>
            <p>
              Average Rating: &#11088; <b>{movie.vote_average}</b> (
              {movie.vote_count} votes)
            </p>

            {movie.production_companies.map(company => (
              <span className='tag' key={company.id}>
                {company.name}
              </span>
            ))}
          </div>

          {isAuthenticated() && <TraktActions />}

          <p className={styles.overview}>{movie.overview}</p>

          <div className={styles.meta}>
            {movie.genres.map(genre => (
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
  const movie = await tmdbFetch(`movie/${params.movie}`);

  return {
    props: {
      movie,
    },
  };
}

export default Movie;
