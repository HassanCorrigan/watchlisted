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
    bar: {
      height: '0.1em',
      width: '1.5em',
      backgroundColor: 'var(--secondary-color)',
      margin: '0.1em 0',
      borderRadius: 'var(--border-radius)',
    },
    barOdd: {
      animation: 'loader 0.5s ease-in-out 0s infinite alternate',
    },
    barEven: {},
  };

  return (
    <div style={styles.background}>
      <div style={styles.loader}>
        <div style={{ ...styles.bar, ...styles.barOdd }}></div>
        <div style={{ ...styles.bar, ...styles.barEven }}></div>
        <div style={{ ...styles.bar, ...styles.barOdd }}></div>
        <div style={{ ...styles.bar, ...styles.barEven }}></div>
      </div>
    </div>
  );
};

export default Loader;
