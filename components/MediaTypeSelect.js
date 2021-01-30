import styles from 'styles/media-select.module.css';

const MediaTypeSelect = ({ mediaType, updateMedia }) => {
  return (
    <div className={styles.mediaSelector}>
      <div className={styles.option}>
        <input
          type='radio'
          id='show'
          name='show'
          value='show'
          checked={mediaType === 'show'}
          onChange={updateMedia}
        />
        <label htmlFor='show'>Shows</label>
      </div>
      <div className={styles.option}>
        <input
          type='radio'
          id='movie'
          name='movie'
          value='movie'
          checked={mediaType === 'movie'}
          onChange={updateMedia}
        />
        <label htmlFor='movie'>Movies</label>
      </div>
    </div>
  );
};

export default MediaTypeSelect;
