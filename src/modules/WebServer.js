const express = require('express')
const app = express()

module.exports = async (client, PORT) => {
  app.use(express.urlencoded({ extended: false }))

  app.listen(PORT, () =>
    console.log(client.color('magenta', '[Web Server]'), `Server on : ${PORT}`)
  )
  require('../router/main')(app, client)
  /*
	 * @type POST
	 * Status Post Data
	 */
  app.post('/v1/status', async (req, res) => {
    try {
      if (!req.body.status)
        throw new Error({
          code: 400,
          message: 'Status can not be null',
        })
      if (!req.body.token)
        throw new Error({
          code: 401,
          message: 'Unauthorized',
        })

      if (!req.body.token == client.pass)
        throw new Error({
          code: 401,
          message: 'Unauthorized',
        })

      if (req.body.desc) {
        client.desc = req.body.desc
        res.status(200).send({
          message: 'Successfully changed status',
        })
      } else {
        client.status = req.body.status
        res.status(200).send({
          message: 'Successfully changed status',
        })
      }
    } catch (e) {
      console.log(e)
      if (e.code) res.status(e.code).send(JSON.stringify(e))
      else res.status(400).send({ message: e.toString() })
    }
  })

  /*
	 * @type GET
	 * Status GET Data
	 */
  app.get('/v1/status/', async (req, res) => {
    res.status(200).send({
      guilds: client.guilds.cache.size,
      status: client.status,
      users: client.users.cache.size,
    })
  })

  app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello World',
    })
  })
}