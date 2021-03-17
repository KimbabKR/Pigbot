const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const axios = require('axios').default;
const client = new Discord.Client();
require('dotenv').config();
/*
    DataBase
*/
MongoDB = require('mongodb');
const DBClient = new MongoDB.MongoClient(process.env.DBPW, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.db = undefined
DBClient.connect().then(() => {
    client.db = DBClient.db('bot').collection('user')
});

/*
    Dokdo
*/
const Dokdo = require('dokdo')

const DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok'], prefix: '//' }) // Using Bot Application ownerID as default for owner option.

client.on('message', async message => {
  if (message.content === 'ping') return message.channel.send('Pong') // handle commands first
  DokdoHandler.run(message) // try !dokdo
})


/*
    Handlers
*/

const { readdirSync } = require('fs');
const fs = require('fs');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.devs = [
    '552103947662524416',
    '674813875291422720',
    '628595345798201355',
    '616570697875193866'
];

client.category = ['관리자', 'MODERATOR', 'INFO', '돈 기능', '이벤트'];

fs.readdirSync('./command/').forEach(dir => {
  const Filter = fs
    .readdirSync(`./command/${dir}`)
    .filter(f => f.endsWith('.js'));
  Filter.forEach(file => {
    const cmd = require(`./command/${dir}/${file}`);
    client.commands.set(cmd.config.name, cmd);
    for (let alias of cmd.config.aliases) {
      client.aliases.set(alias, cmd.config.name);
    }
  });
});

function runCommand(command, msg, args, prefix) {
  if (client.commands.get(command) || client.aliases.get(command)) {
    const cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));
    if (cmd) cmd.run(client, msg, args, prefix);
    return;
  }
}


client.on('message', async msg => {
  const { prefix } = require('./config.json');
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let command = args.shift().toLowerCase();
  try {
    runCommand(command, msg, args, prefix);
  } catch (e) {
    console.error(e);
  }
});

client.on('ready', () => {
    console.log(`[System] ${client.user.username} `);
    setInterval(() => {
        switch (Math.floor(Math.random() * 5)) {
            case 0:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `${client.guilds.cache.size}서버 에 활동`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 1:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `Ping ${client.ws.ping}ms`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 2:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `V2.6.5`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 3:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `꿀꿀봇의 문의/신고는 ㄲ 서포트`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 4:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `ㄲ 초대 봇을 초대하세요!`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 5:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `ㄲ 도움말`,
                        type: 'PLAYING'
                    }
                });
                break;
        }
    }, 10000);
    setInterval(() => {
        axios.post(`https://api.koreanbots.dev/bots/servers`, {
            servers: client.guilds.cache.size
        }, {
            headers: {
                'Content-Type': "application/json",
                token: process.env.KTOKEN
            }
        });
    }, 100000);
});


client.once("reconnecting", () => {
    client.user.setActivity('다시 연결하는 중')
    console.log("reconnecting");
});

client.once("disconnect", () => {
    client.user.setActivity('Disconnect')
    console.log("disconnecting");
});


client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (command) {
        command.run(client, message, args);
    }
})


client.login(process.env.TOKEN);

