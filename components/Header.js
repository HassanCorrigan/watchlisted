import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href='/'>Logo</a>
      <nav>
        <a href='/'>Home</a>
      </nav>
    </header>
  );
};

export default Header;
