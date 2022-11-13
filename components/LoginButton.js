import Link from 'next/link';
import styles from 'styles/components/login-button.module.css';

const LoginButton = () => {
  const client_id = process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID;
  const redirect_uri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/`;

  return (
    <div className={styles.wrapper}>
      <Link
        href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`}
        className={`card ${styles.link}`}>
        <img
          src='/images/trakt-logo.png'
          alt='Trakt Logo'
          className={styles.img}
        />
        <h3 className={styles.h3}>Login with Trakt.tv</h3>
      </Link>
    </div>
  );
};

export default LoginButton;
