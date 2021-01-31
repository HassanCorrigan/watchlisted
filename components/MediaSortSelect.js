import { useEffect } from 'react';

const styles = {
  select: {
    outline: 'none',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    textAlign: 'center',
    padding: '0 0.5em',
    color: 'var(--main-color)',
    backgroundColor: 'var(--secondary-background-color)',
  },
};

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
      style={styles.select}
      name='sort'
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
