import styles from 'styles/components/loader.module.css';

const Loader = () => {
  return (
    <div className={styles.background}>
      <div className={styles.loader}>
        <div className={`${styles.bar} ${styles.barOdd}`}></div>
        <div className={`${styles.bar} ${styles.barEven}`}></div>
        <div className={`${styles.bar} ${styles.barOdd}`}></div>
        <div className={`${styles.bar} ${styles.barEven}`}></div>
      </div>
    </div>
  );
};

export default Loader;
