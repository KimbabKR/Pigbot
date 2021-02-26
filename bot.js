const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();
const config = require("./config.json")
const path = require("path")

const Handler = require('./utils/handlers.js')




client.on('ready', () => {
  console.log(
    `[System] ${client.user.username}로 로그인 하였습니다.`
  );
  client.user.setStatus('idle');
  const botgame = [
    `ㄲ 도움말 확인`,
    `${client.guilds.cache.size}서버와 함께`,
    `${client.users.cache.size}유저들과 게임`
  ];
  setInterval(() => {
    const activity = botgame[Math.floor(Math.random() * botgame.length)];
    client.user.setActivity(activity);
  }, 5500);

});
Handler()
client.login(process.env.TOKEN || config.token);
