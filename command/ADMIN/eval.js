const Discord = require("discord.js");
const util = require('util');


exports.run = async (client, msg, args, prefix, settings) => {
  if (!client.devs.includes(msg.author.id))
    return msg.reply("이 명령어는 Dev 권한이 필요합니다"); // bot.js에서 client.devs를 저장한 것을 불러와 포함하지 않으면 해당 메세지로 답변해줍시다.
        let input = args.slice(0).join(' ');
        if (!input) return msg.channel.send('내용을 써 주세요!');
        const code = `
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const os = require('os');
const dotenv = require('dotenv');

${input}`;
        const embed = new Discord.MessageEmbed()
            .setTitle(`Evaling...`)
            .setColor(0xffff00)
            .addField('Input', '```js\n' + args.slice(0).join(' ') + '\n```')
            .setFooter(msg.author.tag, msg.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await msg.channel.send({
            embed: embed
        });
        try {
            let output = eval(code);
            let type = typeof output;
            if (typeof output !== "string") {
                output = util.inspect(output);
            }
            if (output.length >= 1020) {
                output = `${output.substr(0, 1010)}...`;
            }
            output = output.replace(new RegExp(settings.token, 'gi'), 'Secret');
            const embed2 = new Discord.MessageEmbed()
                .setTitle('Eval result')
                .setColor(0x00ffff)
                .addField('Input', '```js\n' + args.slice(0).join(' ') + '\n```')
                .addField('Output', '```js\n' + output + '\n```')
                .addField('Type', '```js\n' + type + '\n```')
                .setFooter(msg.author.tag, msg.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit({
                embed: embed2
            });
        } catch (err) {
            const embed3 = new Discord.MessageEmbed()
                .setTitle('Eval error...')
                .setColor(0xff0000)
                .addField('Input', '```js\n' + args.slice(0).join(' ') + '\n```')
                .addField('Error', '```js\n' + err + '\n```')
                .setFooter(msg.author.tag, msg.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit({
                embed: embed3
            });
        }
}

exports.config = {
  name: "코드",
  aliases: ["eval"],
  category: ["Dev"],
  des: ["코드 실행합니다."],
  use: ["#코드 <코드>"]
};

