const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  box: {
    height: '75px',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
  },
  line: {
    height: '2px',
    width: '100%',
    backgroundColor: 'black',
  }
}

export default function Stage() {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        Stage
      </div>
      <div style={styles.line} />
    </div>
  )
}