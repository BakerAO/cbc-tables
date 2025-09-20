import colors from '../common/colors'

const styles = {
  grid: {
    boxSizing: 'border-box',
    height: '70%',
    width: '98%',
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
    fontFamily: 'Arial',
    fontSize: 30,
    display: 'flex',
    height: '50px',
    width: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    margin: '15px',
    backgroundColor: colors.size8,
    borderRadius: '5rem',
    color: 'white',
  },
}

export default function Grid(props) {
  const { tables, setSelectedTable } = props

  const handleClick = (p) => {
    setSelectedTable(p)
  }

  const renderTables = () => {
    const items = []
    for (const t of tables) {
      let itemStyle = styles.item
      if (t.size === 10) itemStyle = {
        ...itemStyle,
        backgroundColor: colors.size10,
        height: '60px',
        width: '60px',
        fontSize: 36,
      }
      if (t.assignedPerson) {
        itemStyle = {
          ...itemStyle,
          borderWidth: '5px',
          borderColor: t.size === 10 ? colors.size10 : colors.size8,
          backgroundColor: colors.taken,
        }
      }

      items.push(
        <div style={itemStyle} key={t.id} onClick={() => handleClick(t)}>
          {t.id}
        </div>
      )
    }

    return items
  }

  const renderRows = (renderedTables) => {
    const items = []
    items.push(
      <div style={styles.oddRow} key="row1">
        {renderedTables.slice(0, 8)}
      </div>
    )

    items.push(
      <div style={styles.evenRow} key="row2">
        {renderedTables.slice(8, 18)}
      </div>
    )

    items.push(
      <div style={styles.oddRow} key="row3">
        {renderedTables.slice(18, 28)}
      </div>
    )

    items.push(
      <div style={styles.evenRow} key="row4">
        {renderedTables.slice(28, 39)}
      </div>
    )

    items.push(
      <div style={styles.oddRow} key="row5">
        {renderedTables.slice(39, 50)}
      </div>
    )

    items.push(
      <div style={styles.evenRow} key="row6">
        {renderedTables.slice(50, 55)}
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
