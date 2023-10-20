import { useEffect, useState } from 'react'
import api from '../data/api'
import Grid from './Grid'
import Modal from './Modal'

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
    <div style={{ height: '100vh', width: '100vw' }}>
      <Grid tables={tables} setSelectedTable={setSelectedTable} />
      <Modal selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
    </div>
  )
}
