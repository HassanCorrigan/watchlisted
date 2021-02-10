import { formatDate } from 'helpers/date';
import styles from 'styles/components/media-info-card.module.css';

const MediaInfoCard = ({ runTime, date, voteAverage, voteCount, networks }) => {
  return (
    <div className={styles.info} className='card'>
      <p className={styles.infoItem}>Run Time: {runTime} mins</p>
      <p className={styles.infoItem}>Air Date: {formatDate(date)}</p>
      <p className={styles.infoItem}>
        Average Rating: &#11088; <b>{voteAverage}</b> ({voteCount} votes)
      </p>

      {networks.map(network => (
        <span className='tag' key={network.id}>
          {network.name}{' '}
        </span>
      ))}
    </div>
  );
};

export default MediaInfoCard;
