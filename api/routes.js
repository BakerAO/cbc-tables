import { Router as ExRouter } from 'express'
import mysqlPool from './mysqlPool.js'

const getTables = `
  SELECT
    id,
    size,
    assignedPerson,
    email,
    phone
  FROM brunchTables
`

const wrapper = () => {
  const router = new ExRouter()

  router.get('/', (req, res) => {
    const htmlA = `
      <html>
        <head>CBC-API</head>
        <body>
          <h1>CBC-API</h1>
    `;

    const htmlB = `
      <a href="/generate">
        <button>Generate</button>
      </a>
      <a href="/destroy">
        <button>Destroy</button>
      </a>
    `;

    const htmlC = `
          <a href="/assigned">
            <button>Assigned</button>
          </a>
          <form action="/reset">
            <label for="id">Reset Table</label>
            <br />
            <input type="text" id="id" name="id">
            <br />
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `;

    res.status(200).send(htmlA + htmlC)
  })

  router.get('/tables', async (req, res) => {
    try {
      const [tables] = await mysqlPool.query(getTables)

      res.status(200).send(tables)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.get('/assigned', async (req, res) => {
    try {
      const [tables] = await mysqlPool.query(`
        SELECT
          id,
          size,
          assignedPerson,
          email,
          phone
        FROM brunchTables
        WHERE assignedPerson IS NOT NULL
      `)

      let listItems = ''
      for (const t of tables) {
        listItems += `<li>Table ${t.id}, ${t.assignedPerson}, ${t.email}, ${t.phone}</li>`
      }

      res.status(200).send(`
        <html>
          <head>CBC-API</head>
          <body>
            <h3>Assigned</h3>
            <ul>
              ${listItems}
            </ul>
          </body>
        </html>
      `)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post('/tables', async (req, res) => {
    try {
      const { id, assignedPerson, email, phone } = req.body

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
          assignedPerson = '${assignedPerson}',
          email = '${email}',
          phone = '${phone}'
        WHERE id = ${id}
      `
      await mysqlPool.query(updateQuery)

      const [newTables] = await mysqlPool.query(getTables)
      res.status(200).send(newTables)
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.get('/reset', async (req, res) => {
    try {
      const { id } = req.query;

      const updateQuery = `
        UPDATE brunchTables
        SET
          assignedPerson = NULL,
          email = NULL,
          phone = NULL
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
      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS brunchTables (
          id int primary key,
          size int,
          assignedPerson varchar(100),
          email varchar(100),
          phone varchar(20)
        );
      `)

      for (let i = 1; i <= 55; i++) {
        const insertQuery = `
          INSERT INTO brunchTables (
            id,
            size
          )
          VALUES (
            ${i},
            10
          )
        `

        await mysqlPool.query(insertQuery)
      }

      // await mysqlPool.query(`
      //   UPDATE brunchTables
      //   SET size = 10
      //   WHERE id in (1,4,9,15,19,24,26,31,35,39,41,44,47,51,54)
      // `)

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
