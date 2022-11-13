import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from 'styles/components/header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo}>
        Watchlisted
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
