const MongoDB = require('mongodb')

module.exports = async (client) => {
  const DBClient = new MongoDB.MongoClient(
    `${process.env.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  DBClient.connect().then(() => {
	client.db = {}
    client.db = DBClient.db('bot')
    client.db.user = DBClient.db('bot').collection('user')
    client.db.guild = DBClient.db('bot').collection('guilds')
    
    console.log(client.color('yellow', '[Database] ') + 'MongoDB Connected.')
  })
}