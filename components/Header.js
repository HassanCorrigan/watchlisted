import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href='/'>
        <h1>Logo</h1>
      </a>
      <nav>
        <a href='/'>
          <img src='/images/discover-icon.svg' />
          <span>Discover</span>
        </a>
        <a href='/'>
          <img src='/images/watchlist-icon.svg' />
          <span>Watchlist</span>
        </a>
        <a href='/'>
          <img src='/images/search-icon.svg' />
          <span>Search</span>
        </a>
        <a href='/'>
          <img src='/images/calendar-icon.svg' />
          <span>Calendar</span>
        </a>
        <a href='/'>
          <img src='/images/user-icon.svg' />
          <span>Account</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
