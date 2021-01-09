import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.logo}>Logo</a>
      </Link>

      {router.asPath !== '/' && (
        <a className={styles.backBtn} onClick={() => router.back()}>
          &#8249; Back
        </a>
      )}

      <nav>
        <Link href='/'>
          <a>
            <img src='/images/discover-icon.svg' />
            <span>Discover</span>
          </a>
        </Link>
        <Link href='/watchlist'>
          <a>
            <img src='/images/watchlist-icon.svg' />
            <span>Watchlist</span>
          </a>
        </Link>
        <Link href='/search'>
          <a>
            <img src='/images/search-icon.svg' />
            <span>Search</span>
          </a>
        </Link>
        <Link href='/up-next'>
          <a>
            <img src='/images/calendar-icon.svg' />
            <span>Up Next</span>
          </a>
        </Link>
        <Link href='/account'>
          <a>
            <img src='/images/user-icon.svg' />
            <span>Account</span>
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
