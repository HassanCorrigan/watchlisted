const Loader = () => {
  const styles = {
    background: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--transparent-background-color)',
    },
    loader: {
      padding: '0.5em',
      fontSize: '2em',
      zIndex: '9',
    },
  };

  return (
    <div style={styles.background}>
      <p style={styles.loader}>Loading...</p>
    </div>
  );
};

export default Loader;
