import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { traktFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import LoginButton from 'components/LoginButton';
import styles from 'styles/up-next.module.css';

const UpNext = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setAuthenticated(user.authenticated);
    const today = new Date().toISOString().slice(0, 10);

    user.authenticated &&
      (async () => {
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

        setCalendar(sortList(calendar));
        setLoading(false);
      })();
  }, []);

  const sortList = list => {
    return list
      .map(item => {
        const date = item.first_aired || item.released;
        return { ...item, date };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const formatDate = date => new Date(date).toDateString();

  return (
    <Layout>
      <section className='page'>
        <h1>Up Next</h1>
        {!authenticated ? (
          <LoginButton />
        ) : (
          <>
            {loading && <Loader />}
            <div className={styles.calendar}>
              {calendar.map((item, index) => (
                <div className={styles.calendarItem} key={index}>
                  <h3 className={styles.date}>{formatDate(item.date)}</h3>
                  <div className={styles.info}>
                    <Link
                      href={
                        item.episode
                          ? `shows/${item.show.ids.tmdb}/season/${item.episode.season}/episode/${item.episode.number}`
                          : `movies/${item.movie.ids.tmdb}`
                      }>
                      <a>
                        <h4>{item.episode?.title || item.movie?.title}</h4>
                        {item.movie && <p>{item.movie.tagline}</p>}
                      </a>
                    </Link>
                    {item.show && (
                      <Link href={`shows/${item.show.ids.tmdb}`}>
                        <a>
                          <p>{item.show.title}</p>
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default UpNext;
