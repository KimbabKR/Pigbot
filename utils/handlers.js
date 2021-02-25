const { readdirSync } = require('fs');
const fs = require('fs');

module.exports = () => {
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
}