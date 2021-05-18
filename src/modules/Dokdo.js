const Dokdo = require('dokdo')

module.exports = async (client, prefix) => {
  client.on('message', async (message) => {
    const DokdoHandler = new Dokdo(client, {
      aliases: ['dokdo', 'dok', '독도', '독'],
      prefix: prefix,
      owners: client.developers,
      noPerm: (message) => message.reply('🚫 해당 명령어는 꿀꿀봇 관리자 전용 명령어입니다.'),
    })

    DokdoHandler.run(message)
  })
}