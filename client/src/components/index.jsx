import { useEffect, useState } from 'react'
import api from '../common/api'
import Grid from './Grid'
import Legend from './Legend'
import MainDoors from './MainDoors'
import Modal from './Modal'
import Stage from './Stage'

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    minHeight: '900px',
    minWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function App() {
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)

  useEffect(() => {
    const getTables = async () => {
      const tablesRes = await api.get('/tables')
      setTables(tablesRes.data)
    }

    getTables()
  }, [])

  return (
    <div style={styles.container}>
      <Stage />
      <Grid tables={tables} setSelectedTable={setSelectedTable} />
      <MainDoors />
      <Legend />
      <Modal
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        setTables={setTables}
      />
    </div>
  )
}
