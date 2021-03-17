const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment-timezone");


exports.run = async (client, msg, args, prefix) => {
      let NaverRanking = new Discord.MessageEmbed()
        .setTitle("네이버 실시간 검색어 순위 서비스 종료 안내")
        .setDescription("네이버 실시간 검색어 순위 서비스 종료되었습니다.\n4월 1일에 이 명령어가 삭제될 예정입니다.")
        .setColor("#83ff7b")
        .setFooter("이런게 왜 사용할까?");
      msg.channel.send(NaverRanking);
};

exports.config = {
  name: "네이버랭킹",
  aliases: ["네이버 랭킹"],
  category: ["INFO"],
  des: ["네이버 랭킹을 불러왔습니다."],
  use: ["ㄲ 네이버랭킹"]
};
