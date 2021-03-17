const Discord = require("discord.js")
exports.run = async (client, message, args, prefix) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} Pinging...`)
            .setColor(0xffff00)
            .setTimestamp()
        let m = await message.channel.send(embed);
        const embed2 = new Discord.MessageEmbed()
            .setTitle('PONG!')
            .setColor(0x00ffff)
            .setThumbnail('https://i.imgur.com/1Gk4tOj.png')
            .addField('Latency', `${m.createdAt - message.createdAt}ms`, true)
            .addField('API Latency', `${client.ws.ping}ms`, true)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        m.edit(embed2);
}
exports.config = {
    name: '핑',
    aliases: ['vld', 'botping'],
    category: ['INFO'],
    des: ['봇의 디스코드 웹소켓 지연시간을 알려드립니다'],
    use: ['ㄲ 핑']
}
