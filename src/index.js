// Start Up
process.title = `Pigbot - Ver. ${require('../package.json').version}, ${process.platform}-${process.arch}`

// Dependencies
const Discord = require('discord.js')
const client = new Discord.Client()
const Event = require('./event')
const Modules = require('./modules')

// Variables 
require('dotenv').config()
const PORT = process.env.PORT || 3000
const prefix = process.env.PREFIX
client.status = '오프라인'

// Discord bot client
client.aliases = new Discord.Collection()
client.commands = new Discord.Collection()
client.developers = [
  '552103947662524416'
]
client.module = Modules
client.color = color

// Function
function color(color, string) {
  if(!Modules.colorData[color]){
    throw new TypeError(`There is no color ${color}`)
  } else {
    return `${Modules.colorData[color]}${string}${Modules.colorData.reset}`
  }
}

// Database
Modules.dataBase(client);

// Booting
(async () => {
  client.status = '부팅중...'
  console.clear()

  console.log('---------------------------------------------------------------------')
  console.log('Author(s) : MadeGOD')
  console.log('(C) Team Kimbab. All rights reserved.')
  console.log('---------------------------------------------------------------------')
  console.log(client.color('blue', '[System] ') + `Pigbot - Ver. ${require('../package.json').version}, ${process.platform}-${process.arch}`)

  client.login(process.env.TOKEN)
  await Event.ready(client)
  await Modules.handler(client, prefix, Modules)
  await Modules.web(client, PORT)
	
})()