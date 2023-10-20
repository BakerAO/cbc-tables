import { useState } from 'react'
import api from '../data/api'

const styles = {
  bottom: {
    height: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '50px',
    width: '200px',
    borderRadius: '.25rem',
    backgroundColor: 'green',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 0 0',
  },
  inside: {
    height: '50px',
    width: '50px',
    fontSize: 40,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function AssignPersonForm(props) {
  const { selectedTable, setSelectedTable } = props
  const [assignedPerson, setAssignedPerson] = useState('')

  const handleClose = () => {
    setAssignedPerson('')
    setSelectedTable(null)
  }

  const handleSubmit = () => {
    api.post('tables', {
      id: selectedTable,
      assignedPerson,
    })
    handleClose()
  }

  return (
    <div style={styles.bottom}>
      <h3>{selectedTable}</h3>
      <div style={styles.textInput}>
        <label style={{ marginRight: 5 }}>Name</label>
        <input
          type='text'
          value={assignedPerson}
          onChange={(e) => setAssignedPerson(e.target.value)}
        />
      </div>
      <button style={styles.button} onClick={handleSubmit}>
        <div style={styles.inside}>
          Submit
        </div>
      </button>
    </div>
  )
}
