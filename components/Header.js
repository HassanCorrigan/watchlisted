import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from 'styles/header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.logo}>Watchlisted</a>
      </Link>

      {router.pathname !== '/' && (
        <a className={styles.backBtn} onClick={() => router.back()}>
          &#8249; Back
        </a>
      )}
    </header>
  );
};

export default Header;
