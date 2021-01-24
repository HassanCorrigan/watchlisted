import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { traktFetch } from 'helpers/apiFetch';
import { logOut } from 'helpers/auth';
import styles from 'styles/account.module.css';

const UserStats = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState();

  useEffect(() => {
    setStats();
  }, []);

  const setStats = async () => {
    const stats = await traktFetch('users/me/stats', user.token);
    setUserStats(stats);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.wrapper}>
          <h2>Account Stats</h2>
          <p>
            A selection of account statisics about you and your viewing habits.
          </p>

          <div className={styles.statsOverview}>
            <div className={styles.category}>
              <h3>Movies</h3>
              <div className={styles.stats}>
                <div>
                  <p className={styles.value}>{userStats.movies.watched}</p>
                  <p className={styles.label}>Watched</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.movies.collected}</p>
                  <p className={styles.label}>Collected</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.movies.ratings}</p>
                  <p className={styles.label}>Rated</p>
                </div>
              </div>
            </div>

            <div className={styles.category}>
              <h3>Shows</h3>
              <div className={styles.stats}>
                <div>
                  <p className={styles.value}>{userStats.shows.watched}</p>
                  <p className={styles.label}>Watched</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.shows.collected}</p>
                  <p className={styles.label}>Collected</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.shows.ratings}</p>
                  <p className={styles.label}>Rated</p>
                </div>
              </div>
            </div>

            <div className={styles.category}>
              <h3>Episodes</h3>
              <div className={styles.stats}>
                <div>
                  <p className={styles.value}>{userStats.episodes.watched}</p>
                  <p className={styles.label}>Watched</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.episodes.collected}</p>
                  <p className={styles.label}>Collected</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.episodes.ratings}</p>
                  <p className={styles.label}>Rated</p>
                </div>
              </div>
            </div>

            <div className={styles.category}>
              <h3>Social</h3>
              <div className={styles.stats}>
                <div>
                  <p className={styles.value}>{userStats.network.followers}</p>
                  <p className={styles.label}>Followers</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.network.following}</p>
                  <p className={styles.label}>Following</p>
                </div>
                <div>
                  <p className={styles.value}>{userStats.network.friends}</p>
                  <p className={styles.label}>Friends</p>
                </div>
              </div>
            </div>
          </div>

          <button className={styles.btn} onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      )}
    </>
  );
};

export default UserStats;
