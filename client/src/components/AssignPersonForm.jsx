import { useState } from 'react'
import api from '../common/api'

const styles = {
  container: {
    height: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: '25px',
    fontSize: 20,
  },
  button: {
    height: '30px',
    width: '150px',
    borderRadius: '.25rem',
    backgroundColor: 'green',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px 0 0 0',
  },
  inside: {
    height: '30px',
    width: '50px',
    fontSize: 25,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontSize: 25,
  },
}

export default function AssignPersonForm(props) {
  const { selectedTable, setSelectedTable, setTables } = props
  const [assignedPerson, setAssignedPerson] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    const newTables = await api.post('tables', {
      id: selectedTable.id,
      assignedPerson,
      email,
      phone,
    })
    setTables(newTables.data)
    setAssignedPerson('')
    setEmail('')
    setPhone('')
    setSelectedTable(newTables.data.find(t => t.id === selectedTable.id))
  }

  const renderInput = () => {
    return (
      <>
        <div style={styles.textInput}>
          <label style={styles.label}>Name:</label>
          <input
            style={styles.input}
            type='text'
            value={assignedPerson}
            onChange={(e) => setAssignedPerson(e.target.value)}
          />
        </div>
        <div style={styles.textInput}>
          <label style={styles.label}>Email:</label>
          <input
            style={styles.input}
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.textInput}>
          <label style={styles.label}>Phone:</label>
          <input
            style={styles.input}
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button style={styles.button} onClick={handleSubmit}>
          <div style={styles.inside}>
            Submit
          </div>
        </button>
      </>
    )
  }

  if (!selectedTable) return <div />

  return (
    <div style={styles.container}>
      <h1>Table {selectedTable.id}</h1>
      <h2>{selectedTable.assignedPerson}</h2>
      {!selectedTable.assignedPerson ? renderInput() : null}
    </div>
  )
}
