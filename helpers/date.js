const formatDate = date => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-GB', options);
};

export { formatDate };
