import { useEffect, useState } from 'react';
import { useAppContext } from 'context/state.js';
import Layout from 'components/Layout.js';
import LoginButton from 'components/LoginButton.js';

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
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => setAuthenticated(context.authenticated), []);

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
