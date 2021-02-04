import { useEffect } from 'react';

const styles = {
  select: {
    border: 'none',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    fontSize: '0.9em',
    borderRadius: 'var(--border-radius)',
    padding: '0 0.5em',
    color: 'var(--main-color)',
    background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(167, 12, 110)'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat`,
    backgroundSize: '10px',
    backgroundPosition: 'calc(100% - 10px) 1.1em',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'var(--secondary-background-color)',
    minWidth: '8.5em',
    minHeight: '2.3em',
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
