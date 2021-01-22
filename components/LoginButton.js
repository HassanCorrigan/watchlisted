import Link from 'next/link';

const LoginButton = () => {
  const styles = {
    link: {
      color: 'var(--main-color)',
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
  const redirect_uri = 'http://localhost:3000/api/auth/';

  return (
    <Link
      href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`}>
      <a style={styles.link}>
        <h3 style={styles.h3}>Login with</h3>
        <img src='/images/trakt-logo.png' alt='Trakt Logo' style={styles.img} />
      </a>
    </Link>
  );
};

export default LoginButton;
