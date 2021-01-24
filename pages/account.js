import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import UserStats from 'components/UserStats';
import styles from 'styles/account.module.css';
import { traktFetch } from 'helpers/apiFetch';

const Account = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setAuthenticated(user.authenticated);
    user.authenticated && createUserDetails();
  }, []);

  const createUserDetails = async () => {
    const data = await traktFetch('users/me', user.token, 'extended=full');
    setUserDetails(await data);
    setLoading(false);
  };

  return (
    <Layout>
      <section className='page'>
        <h1>Account</h1>
        <div className={styles.content}>
          {!authenticated ? (
            <LoginButton />
          ) : (
            <>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className={styles.details}>
                    <img
                      className={styles.avatar}
                      src={userDetails.images?.avatar.full}
                      alt='User Profile Photo'
                    />
                    <p>
                      {userDetails.name} - @{userDetails.username}
                    </p>
                  </div>
                  <UserStats />
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Account;
