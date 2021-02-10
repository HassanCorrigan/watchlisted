import styles from 'styles/components/media-type-select.module.css';

const MediaTypeSelect = ({ mediaType, setMediaType }) => {
  const handleChange = e => {
    setMediaType(e.target.value);
    localStorage.setItem('media-type', e.target.value);
  };

  return (
    <div className={styles.mediaSelector}>
      <div className={styles.option}>
        <input
          type='radio'
          id='show'
          name='show'
          value='show'
          checked={mediaType === 'show'}
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <label htmlFor='movie'>Movies</label>
      </div>
    </div>
  );
};

export default MediaTypeSelect;
