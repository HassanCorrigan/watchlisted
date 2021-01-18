import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { logOut } from 'helpers/auth';
import { traktFetch } from 'helpers/apiFetch';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import styles from 'styles/account.module.css';

const Account = ({ userStats }) => {
  const context = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    setAuthenticated(context.isAuthenticated);
  }, []);

  return (
    <Layout>
      <section className='page'>
        <h1>Account</h1>
        <div className={styles.content}>
          {!authenticated ? (
            <LoginButton />
          ) : (
            <div>
              <h2>Account Stats</h2>
              <p>
                A selection of account statisics about you and your viewing
                habits.
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
                      <p className={styles.value}>
                        {userStats.movies.collected}
                      </p>
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
                      <p className={styles.value}>
                        {userStats.shows.collected}
                      </p>
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
                      <p className={styles.value}>
                        {userStats.episodes.watched}
                      </p>
                      <p className={styles.label}>Watched</p>
                    </div>
                    <div>
                      <p className={styles.value}>
                        {userStats.episodes.collected}
                      </p>
                      <p className={styles.label}>Collected</p>
                    </div>
                    <div>
                      <p className={styles.value}>
                        {userStats.episodes.ratings}
                      </p>
                      <p className={styles.label}>Rated</p>
                    </div>
                  </div>
                </div>

                <div className={styles.category}>
                  <h3>Social</h3>
                  <div className={styles.stats}>
                    <div>
                      <p className={styles.value}>
                        {userStats.network.followers}
                      </p>
                      <p className={styles.label}>Followers</p>
                    </div>
                    <div>
                      <p className={styles.value}>
                        {userStats.network.following}
                      </p>
                      <p className={styles.label}>Following</p>
                    </div>
                    <div>
                      <p className={styles.value}>
                        {userStats.network.friends}
                      </p>
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
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const cookieString = context.req.headers.cookie;
  const token = cookieString.split('=')[1];

  const userStats = await traktFetch('users/sean/stats', token);

  return {
    props: { userStats },
  };
}

export default Account;
