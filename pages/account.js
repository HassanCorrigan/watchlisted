import { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';
import UserStats from 'components/UserStats';
import styles from 'styles/account.module.css';

const Account = () => {
  const { user } = useAppContext();
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    setAuthenticated(user.authenticated);
  }, []);

  return (
    <Layout>
      <section className='page'>
        <h1>Account</h1>
        <div className={styles.content}>
          {!authenticated ? <LoginButton /> : <UserStats />}
        </div>
      </section>
    </Layout>
  );
};

export default Account;
