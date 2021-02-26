
const Discord = require('discord.js');
const client = new Discord.Client();
const { readdirSync } = require('fs');
const fs = require('fs');

module.exports = () => {
client.emotes = require('./../emoji.json');
client.colors = require('./../color.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.devs = [
	'552103947662524416',
	'674813875291422720',
	'628595345798201355',
	'616570697875193866'
];

client.category = ['관리자', 'MODERATOR', 'INFO', '돈 기능', '이벤트'];

fs.readdirSync('/home/runner/Pigbot/command/').forEach(dir => {
  const Filter = fs
    .readdirSync(`/home/runner/Pigbot/command/${dir}`)
    .filter(f => f.endsWith('.js'));
  Filter.forEach(file => {
    const cmd = require(`/home/runner/Pigbot/command/${dir}/${file}`);
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
  const { prefix } = require('/home/runner/Pigbot/config.json');
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
}