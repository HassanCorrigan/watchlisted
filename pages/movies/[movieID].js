import { tmdbFetch } from 'helpers/apiFetch.js';
import { createBannerPath } from 'helpers/createImagePath.js';
import Layout from 'components/Layout.js';
import Poster from 'components/Poster.js';
import styles from 'styles/movie.module.css';

const Movie = ({ movie }) => {
  // console.log(movie);
  return (
    <Layout>
      <section>
        <header
          style={{
            backgroundImage: `url(${createBannerPath(movie.backdrop_path)})`,
          }}
          className={styles.header}>
          <h2 className={styles.title}>{movie.title}</h2>
          <Poster media={movie} />
        </header>

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
  const movie = await tmdbFetch(`movie/${params.movieID}`);

  return {
    props: {
      movie,
    },
  };
}

export default Movie;
