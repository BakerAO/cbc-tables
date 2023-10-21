import { Router as ExRouter } from 'express'
import mysqlPool from './mysqlPool.js'

const getTables = `
  SELECT
    id,
    size,
    assignedPerson
  FROM brunchTables
`

const wrapper = () => {
  const router = new ExRouter()

  router.get('/', (req, res) => {
    res.status(200).send(`
      <html>
        <head>CBC-API</head>
        <body>
          <h1>CBC-API</h1>
          <a href="/generate">
            <button>Generate</button>
          </a>
          <a href="/destroy">
            <button>Destroy</button>
          </a>
        </body>
      </html>
    `)
  })

  router.get('/tables', async (req, res) => {
    try {
      const [tables] = await mysqlPool.query(getTables)

      res.status(200).send(tables)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post('/tables', async (req, res) => {
    try {
      const { id, assignedPerson } = req.body

      const [currTables] = await mysqlPool.query(`
        SELECT
          assignedPerson
        FROM brunchTables
        WHERE id = ${id}
      `)

      if (currTables[0].assignedPerson) {
        res.status(500).send('Table already saved')
        return
      }

      const updateQuery = `
        UPDATE brunchTables
        SET
          assignedPerson = '${assignedPerson}'
        WHERE id = ${id}
      `
      await mysqlPool.query(updateQuery)

      const [newTables] = await mysqlPool.query(getTables)
      res.status(200).send(newTables)
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.get('/reset/:id', async (req, res) => {
    try {
      const { id } = req.params

      const updateQuery = `
        UPDATE brunchTables
        SET
          assignedPerson = NULL
        WHERE id = ${id}
      `
      await mysqlPool.query(updateQuery)

      const [newTables] = await mysqlPool.query(getTables)
      res.status(200).send(newTables)
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.get('/generate', async (req, res) => {
    try {
      const [exists] = await mysqlPool.query(getTables)
      if (exists && exists.length) {
        res.status(200).send('Already exists')
        return
      }

      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS brunchTables (
          id int primary key,
          size int,
          assignedPerson varchar(100)
        );
      `)

      for (let i = 1; i <= 54; i++) {
        const createTable = `
          INSERT INTO brunchTables (
            id,
            size
          )
          VALUES (
            ${i},
            8
          )
        `

        await mysqlPool.query(createTable)
      }

      
      await mysqlPool.query(`
        UPDATE brunchTables
        SET size = 10
        WHERE id in (1,4,9,15,19,24,26,31,35,39,41,44,47,51,54)
      `)
  
      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.get('/destroy', async (req, res) => {
    try {
      await mysqlPool.query(`
        DROP TABLE IF EXISTS brunchTables;
      `)

      res.status(200).send('Success')
    } catch (e) {
      res.status(500).send(e)
    }
  })

  return router
}

export default wrapper
