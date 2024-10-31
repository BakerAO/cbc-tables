import colors from '../common/colors'

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Arial',
  },
  row: {
    width: '27%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  item: {
    height: '30px',
    width: '30px',
    border: '1px solid black',
    marginLeft: '5px',
    backgroundColor: colors.size10,
    borderRadius: '5rem',
  },
}

export default function Legend() {
  return (
    <div style={styles.container}>
      <div style={styles.subContainer}>
        <div style={styles.row}>
          <h4 style={styles.header}>10 Spots</h4>
          <div style={styles.item} />
        </div>
        {/* <div style={styles.row}>
          <h4 style={styles.header}>8 Spots</h4>
          <div style={{ ...styles.item, backgroundColor: colors.size8 }} />
        </div> */}
        <div style={styles.row}>
          <h4 style={styles.header}>Taken</h4>
          <div style={{ ...styles.item, backgroundColor: colors.taken }} />
        </div>
      </div>
    </div>
  )
}
