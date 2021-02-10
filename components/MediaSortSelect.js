import { useEffect } from 'react';
import styles from 'styles/components/media-sort-select.module.css';

const MediaSortSelect = ({
  nameLabel,
  addedLabel,
  releasedLabel,
  sortOrder,
  setSortOrder,
}) => {
  useEffect(() => {
    const localSort = localStorage.getItem('sort-order') || 'title';
    setSortOrder(localSort);
  });

  const handleChange = e => {
    setSortOrder(e.target.value);
    localStorage.setItem('sort-order', e.target.value);
  };

  return (
    <select
      className={styles.select}
      name='sort'
      aria-label='Sort Order of Items'
      value={sortOrder}
      onChange={handleChange}>
      <option value='title'>{nameLabel}</option>
      <option value='added'>{addedLabel}</option>
      <option value='released'>{releasedLabel}</option>
    </select>
  );
};

MediaSortSelect.defaultProps = {
  nameLabel: 'Name',
  addedLabel: 'Added',
  releasedLabel: 'Release Date',
};

export default MediaSortSelect;
