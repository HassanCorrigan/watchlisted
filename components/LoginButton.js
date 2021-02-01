import Link from 'next/link';

const LoginButton = () => {
  const styles = {
    wrapper: {
      width: '100%',
      minHeight: '70vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    link: {
      color: 'var(--main-color)',
      display: 'inline-block',
      padding: '1em',
    },
    h3: {
      fontWeight: '500',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    img: {
      width: '10em',
      height: 'auto',
    },
  };

  const client_id = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const redirect_uri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/`;

  return (
    <div style={styles.wrapper}>
      <Link
        href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`}>
        <a style={styles.link}>
          <h3 style={styles.h3}>Login with</h3>
          <img
            src='/images/trakt-logo.png'
            alt='Trakt Logo'
            style={styles.img}
          />
        </a>
      </Link>
    </div>
  );
};

export default LoginButton;
