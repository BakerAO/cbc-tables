import express from 'express'
import routes from './routes.js'

const apiPort = 8001

const app = express()

app.use(express.json())
// app.use(express.static(__dirname, { dotfiles: 'allow' } ))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.use('/', routes())

app.listen(apiPort, () => {
  console.log(`API Started on http://localhost:${apiPort}\n`)
})
