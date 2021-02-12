import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { tmdbFetch } from 'helpers/api';
import Layout from 'components/Layout';
import MediaHeader from 'components/MediaHeader';
import MediaInfoCard from 'components/MediaInfoCard';
import TraktActions from 'components/TraktActions';
import styles from 'styles/pages/media-page.module.css';

const Movie = ({ movie }) => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(user.authenticated);
  }, []);

  return (
    <Layout>
      <section>
        <MediaHeader
          title={movie.title}
          banner={movie.backdrop_path}
          poster={movie}
        />

        <MediaInfoCard
          runTime={movie.runtime}
          date={movie.release_date}
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          networks={movie.production_companies}
        />

        {authenticated && <TraktActions media={movie} mediaType='movie' />}

        <p className={styles.overview}>{movie.overview}</p>

        <div className={styles.meta}>
          {movie.genres.map(genre => (
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
  const movie = await tmdbFetch(`movie/${params.movie}`);

  return {
    props: {
      movie,
    },
  };
}

export default Movie;
