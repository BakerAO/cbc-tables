const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  box: {
    fontSize: 25,
    fontFamily: 'Arial',
    height: '55px',
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
  },
  line: {
    height: '2px',
    width: '100%',
    backgroundColor: 'black',
  }
}

export default function MainDoors() {
  return (
    <div style={styles.container}>
      <div style={styles.line} />
      <div style={styles.box}>
        Main Doors
      </div>
    </div>
  )
}