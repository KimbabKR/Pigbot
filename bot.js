const Discord = require('discord.js');
const client = new Discord.Client();
const { config } = require('dotenv');
config();
const config = require("./config.json")
const path = require("path")

client.player = player;
client.emotes = require('./emoji.json');
client.colors = require('./color.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.devs = [
	'552103947662524416',
	'674813875291422720',
	'628595345798201355',
	'616570697875193866'
];

client.category = ['관리자', 'MODERATOR', 'INFO', '돈 기능', '이벤트'];


require('./utils/handler.js')(client);


client.on('ready', () => {
	console.log(
		`[System]${client.user.username}로 로그인 하였습니다.`
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


client.login(process.env.TOKEN || config.token);
