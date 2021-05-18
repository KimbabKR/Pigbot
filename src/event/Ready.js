module.exports = async (client) => {
  client.on('ready', async () => {
    console.log(client.color('cyan', '[Bot] ') + `Logged on ${client.user.username}`)
    setInterval(() => {
      switch (Math.floor(Math.random() * 2)) {
      case 0:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: `ㄲ 도움ㅣ${client.guilds.cache.size}서버`,
            type: 'PLAYING',
          },
        })
        break
      case 1:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: `ㄲ 도움ㅣ${client.users.cache.size}서버`,
            type: 'PLAYING',
          },
        })
        break
	  case 2:
        client.user.setPresence({
          status: 'online',
          activity: {
            name: `ㄲ 도움ㅣ${client.users.cache.size}서버`,
            type: 'PLAYING',
          },
        })
        break
      }
    }, 10000)
  })
    setTimeout(async () => {
      client.status = '정상 운영중...'
    }, 3000)
}