const express = require('express')
const app = express()

app.use(express.json())



module.exports = 
  /**
   * @param {import('express').Application} app express app
   * @param {import('discord.js').Client} client client
   */
  async (client, PORT) => {
    /* Version 1 Gateway */

    app.get('/v1', async (req, res) => {
      res.status(400).send({
        code : 200,
        message : 'Gateway V1 Available'
      })
    })
    app.get('/v1/status/', async (req, res) => {
      res.status(200).send({
        guilds: client.guilds.cache.size,
        status: client.status,
        users: client.users.cache.size,
      })
    })

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

    /* Version 2 Gateway */
    app.get('/v2', async (req, res) => {
      res.status(400).send({
        code : 400,
        message : 'Gateway V1 Deprecated'
      })
    })
    
    /* Root Dir GET */
    app.get('/', async (req, res) => {
      res.status(200).send({
        code : 200,
        message: 'Hello World',
        gateway : {
          'Version 1' : 'Available',
          'Version 2' : 'Deprecated'
        }
      })
    })
    app.listen(PORT, () =>
      console.log(client.color('magenta', '[Web Server]'), `Server on : ${PORT}`)
    )
  }
