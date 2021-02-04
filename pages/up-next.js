import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { tmdbFetch, traktFetch } from 'helpers/apiFetch';
import { formatDate } from 'helpers/date';
import { createBannerPath } from 'helpers/createImagePath';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import RefreshButton from 'components/RefreshButton';
import LoginButton from 'components/LoginButton';
import styles from 'styles/up-next.module.css';

const UpNext = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [watching, setWatching] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);

    user.authenticated &&
      (async () => {
        const watching =
          JSON.parse(localStorage.getItem('watching')) ||
          (await createWatching());
        setWatching(watching);
        setCalendar(await createCalendar());
        setLoading(false);
      })();
  }, []);

  const createWatching = async () => {
    const watched = await traktFetch('sync/watched/shows', user.token);

    const progress = await Promise.all(
      watched.map(async ({ show }) => {
        const showProgress = await traktFetch(
          `shows/${show.ids.trakt}/progress/watched`,
          user.token
        );
        const media = await tmdbFetch(`tv/${show.ids.tmdb}`);

        return { show, showProgress, media };
      })
    );

    const watching = progress.filter(
      ({ showProgress }) => showProgress.aired - showProgress.completed > 0
    );

    localStorage.setItem('watching', JSON.stringify(watching));

    return watching;
  };

  const createCalendar = async () => {
    const today = new Date().toISOString().slice(0, 10);

    const showCalendar = await traktFetch(
      `calendars/my/shows/${today}/28`,
      user.token
    );

    const movieCalendar = await traktFetch(
      `calendars/my/movies/${today}/28`,
      user.token,
      `extended=full`
    );
    const calendar = showCalendar.concat(movieCalendar);

    return sortList(calendar);
  };

  const sortList = list => {
    return list
      .map(item => {
        const date = item.first_aired || item.released;
        return { ...item, date };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const handleRefresh = async () => setWatching(await createWatching());

  return (
    <Layout>
      <section className='page'>
        <h1>Up Next</h1>
        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <section className={styles.section}>
              <h2>Watching</h2>
              <div className={styles.controls}>
                <RefreshButton updateList={handleRefresh} />
              </div>
              <div className={styles.watching}>
                {watching.map(({ show, showProgress, media }, index) => (
                  <Link
                    href={`shows/${show.ids.tmdb}/season/${showProgress.next_episode.season}/episode/${showProgress.next_episode.number}`}
                    key={index}>
                    <a className={styles.watchItem}>
                      <div
                        className={styles.banner}
                        style={{
                          backgroundImage: `url("${createBannerPath(
                            media.backdrop_path
                          )}")`,
                        }}>
                        <div>
                          <h3>{show.title}</h3>
                          <p>
                            {`${showProgress.next_episode.title} - S${showProgress.next_episode.season}xE${showProgress.next_episode.number}`}
                          </p>
                          <p>
                            {showProgress.aired - showProgress.completed}{' '}
                            Remaining
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
            <section className={styles.section}>
              <h2>This Month</h2>
              <div className={styles.calendar}>
                {calendar.map((item, index) => (
                  <div className={styles.calendarItem} key={index}>
                    <h3 className={styles.date}>{formatDate(item.date)}</h3>
                    <div className={styles.info}>
                      <Link
                        href={
                          item.show
                            ? `shows/${item.show.ids.tmdb}`
                            : `movies/${item.movie.ids.tmdb}`
                        }>
                        <a>
                          <h4>{item.show?.title || item.movie?.title}</h4>
                          {item.movie && <p>{item.movie.tagline}</p>}
                        </a>
                      </Link>
                      {item.episode && (
                        <Link
                          href={`shows/${item.show.ids.tmdb}/season/${item.episode.season}/episode/${item.episode.number}`}>
                          <a>
                            <p>{`S${item.episode.season}xE${item.episode.number} - ${item.episode?.title}`}</p>
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </Layout>
  );
};

export default UpNext;
