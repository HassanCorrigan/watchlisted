import { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import { logOut } from 'helpers/auth';
import Layout from 'components/Layout';
import LoginButton from 'components/LoginButton';

const Account = () => {
  const styles = {
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2em',
    },
  };

  const context = useAppContext();
  const [authenticated, setAuthenticated] = useState(context.isAuthenticated);

  return (
    <Layout>
      <section className='page'>
        <h1>Account</h1>
        <div style={styles.content}>
          {!authenticated ? (
            <LoginButton />
          ) : (
            <div>
              <h2>Account Stats</h2>
              <button onClick={() => logOut()}>Log Out</button>
              <p>
                Here are a selection of Account statisics about your viewing
                habits.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Account;
