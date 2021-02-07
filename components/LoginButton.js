import Link from 'next/link';

const LoginButton = () => {
  const styles = {
    wrapper: {
      width: '100%',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
    },
    h3: {
      fontWeight: '500',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    img: {
      width: '2.5em',
      marginRight: '0.5em',
      height: 'auto',
    },
  };

  const client_id = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const redirect_uri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/`;

  return (
    <div style={styles.wrapper}>
      <Link
        href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`}>
        <a style={styles.link} className='card'>
          <img
            src='/images/trakt-logo.png'
            alt='Trakt Logo'
            style={styles.img}
          />
          <h3 style={styles.h3}>Login with Trakt.tv</h3>
        </a>
      </Link>
    </div>
  );
};

export default LoginButton;
