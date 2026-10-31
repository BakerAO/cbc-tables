import express from 'express'
import basicAuth from 'express-basic-auth'
import routes from './routes.js'

export const adminAuth = basicAuth({
  users: {
    [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD
  },
  challenge: true,
  realm: 'CBC Admin'
})

const apiPort = 8001

const app = express()

app.use(express.json())

// app.use(express.static(__dirname, { dotfiles: 'allow' } ))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")
//   next()
// })

app.use('/api', routes())

app.listen(apiPort, () => {
  console.log(`API Started on http://localhost:${apiPort}\n`)
})
