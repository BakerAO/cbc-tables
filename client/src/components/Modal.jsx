import AssignPersonForm from './AssignPersonForm'

const styles = {
  dialog: {
    position: 'absolute',
    top: '50px',
    boxShadow: "0px 0px 500px #555555",
  },
  container: {
    height: '600px',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  top: {
    height: '60px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  close: {
    fontSize: 40,
    color: 'white',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function Modal(props) {
  const { selectedTable, setSelectedTable } = props

  return (
    <dialog open={!!selectedTable} style={styles.dialog}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div style={styles.close} onClick={() => setSelectedTable(null)}>
            X
          </div>
        </div>
        <AssignPersonForm selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
      </div>
    </dialog>
  )
}
