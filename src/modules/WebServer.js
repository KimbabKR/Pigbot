const express = require('express')
const app = express()

module.exports = async (client, PORT) => {
  app.use(express.urlencoded({extended: false}))
  
  app.listen(PORT, () => console.log(client.color('magenta', '[Web Server]'), `Server on : ${PORT}`))
  require('../router/main')(app, client)
}