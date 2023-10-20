import api from '../data/api'

const styles = {
  grid: {
    boxSizing: 'border-box',
    height: '80%',
    width: '98%',
    border: '2px solid black',
  },
  insideGrid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oddRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  evenRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  item: {
    display: 'flex',
    height: '50px',
    width: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    margin: '5px',
    fontSize: 30,
    backgroundColor: 'red',
    borderRadius: '5rem',
    color: 'white',
  }
}

export default function Grid(props) {
  const { tables, setSelectedTable } = props

  const handleClick = (p) => {
    setSelectedTable(p.id)
  }

  const renderTables = () => {
    const items = []
    for (const t of tables) {
      let style = styles.item
      if (t.size === 10) style = {
        ...style,
        backgroundColor: 'green',
        height: '60px',
        width: '60px',
      }

      items.push(
        <div style={style} key={t.id} onClick={() => handleClick(t)}>
          {t.id}
        </div>
      )
    }

    return items
  }

  const renderRows = (renderedTables) => {
    const items = []
    items.push(
      <div style={styles.oddRow}>
        {renderedTables.slice(0, 8)}
      </div>
    )

    items.push(
      <div style={styles.evenRow}>
        {renderedTables.slice(8, 18)}
      </div>
    )

    items.push(
      <div style={styles.oddRow}>
        {renderedTables.slice(18, 28)}
      </div>
    )

    items.push(
      <div style={styles.evenRow}>
        {renderedTables.slice(28, 39)}
      </div>
    )

    items.push(
      <div style={styles.oddRow}>
        {renderedTables.slice(39, 50)}
      </div>
    )

    items.push(
      <div style={styles.evenRow}>
        {renderedTables.slice(50, 54)}
      </div>
    )

    return items
  }


  return (
    <div style={styles.grid}>
      <div style={styles.insideGrid}>
        {renderRows(renderTables())}
      </div>
    </div>
  )
}
