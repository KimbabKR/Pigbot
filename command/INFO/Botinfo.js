const Discord = require("discord.js")


exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
    .setTitle("봇 정보")
    .setDescription("꿀꿀봇은 <:nodejs:805323581792976896> 와 :heart: 로 만든 봇입니다.")
    .setFooter("Powered by 꿀꿀봇")
    .addField("<:nodejs:805323581792976896>버전", "V12.16.2")
    .addField("<:djs:805323390734696448>버전", "V12.5.1")
    .addField("봇 제작 날짜 :" , `3월4일`)
    .addField("<:Profile:805323506325127199> 봇 제작자 :", `안꿀꿀`)
    .addField("봇 핑 :", `${client.ws.ping}ms`)
    msg.channel.send(embed)
}

exports.config = {
    name: '봇정보',
    aliases: ['botinfo', '봇정보'],
    category: ['INFO'],
    des: ['봇정보에 대한 설명'],
    use: ['ㄲ 봇정보']
}
