import { useState } from 'react';
import styles from 'styles/refresh-button.module.css';

const RefreshButton = ({ updateList }) => {
  const [refreshText, setRefreshText] = useState('Refresh');
  const [animateRefresh, setAnimateRefresh] = useState(false);

  const handleClick = async () => {
    setRefreshText('Refreshing');
    setAnimateRefresh(true);
    await updateList();
    setRefreshText('Refresh');
    setAnimateRefresh(false);
  };

  return (
    <button className={styles.refreshBtn} onClick={handleClick}>
      {refreshText}
      <svg
        className={styles.refreshIcon}
        active={animateRefresh.toString()}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M19.734 16.06a8.923 8.923 0 01-3.915 3.978 8.706 8.706 0 01-5.471.832 8.795 8.795 0 01-4.887-2.64 9.067 9.067 0 01-2.388-5.079 9.136 9.136 0 011.044-5.53 8.904 8.904 0 014.069-3.815 8.7 8.7 0 015.5-.608c1.85.401 3.366 1.313 4.62 2.755.151.16.735.806 1.22 1.781' />
        <path d='M15.069 7.813l5.04.907L21 3.59' />
      </svg>
    </button>
  );
};

export default RefreshButton;
