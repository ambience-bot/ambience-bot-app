const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const dispatchers = {};

client.once('ready', () => {
  console.log('Ready!');
});

client.commands = new Discord.Collection()
client.songIds = new Discord.Collection() 

const commandFiles = fs
    .readdirSync(`${__dirname}/./commands`)
    .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
})

client.login(process.env.DISCORD_TOKEN);

client.on('message', (message) => {
    const prefix = '!';

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play') {
        client.commands.get('play').execute(args, dispatchers, message);
      } else if (command === 'pause') {
        client.commands.get('pause').execute(client, dispatchers, message);
      } else if (command === 'resume') {
        client.commands.get('resume').execute(client, dispatchers, message);
      } else if (command === 'end') {
        client.commands.get('end').execute(client, dispatchers, message);
    }
});