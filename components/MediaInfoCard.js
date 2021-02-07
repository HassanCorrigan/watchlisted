import { formatDate } from 'helpers/date';

const styles = {
  info: {
    margin: '0.5em',
  },
  infoItem: {
    marginBottom: '0.5em',
  },
};

const MediaInfoCard = ({ runTime, date, voteAverage, voteCount, networks }) => {
  return (
    <div style={styles.info} className='card'>
      <p style={styles.infoItem}>Run Time: {runTime} mins</p>
      <p style={styles.infoItem}>Air Date: {formatDate(date)}</p>
      <p style={styles.infoItem}>
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
