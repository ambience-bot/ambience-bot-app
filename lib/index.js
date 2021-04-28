const Discord = require('discord.js');
const client = new Discord.Client();
const handleDiscordBotErrors = require('./utils/errorHandling');
const fs = require('fs');
const dispatchers = {};
const globalState = {};
const embeddedWelcome = require('./utils/embeddedWelcome');



client.once('ready', () => {
  console.log('Ready!');
  
});

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  channel.send(embeddedWelcome)
  client.user.setAvatar('./assets/ambi.jpg');
})

client.commands = new Discord.Collection();
client.songIds = new Discord.Collection();

const commandFiles = fs
  .readdirSync(`${__dirname}/./commands`)
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', (message) => {
  const prefix = '!';

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    globalState.id = 0;
    client.commands
      .get('play')
      .execute(args, client, dispatchers, globalState, message);
  } else if (command === 'pause') {
    client.commands.get('pause').execute(client, dispatchers, message);
  } else if (command === 'resume') {
    client.commands.get('resume').execute(client, dispatchers, message);
  } else if (command === 'end') {
    client.commands.get('end').execute(client, dispatchers, message);
  } else if (command === 'next') {
    client.commands
      .get('next')
      .execute(args, client, dispatchers, globalState, message);
  } else if (command === 'previous') {
    client.commands
      .get('previous')
      .execute(args, client, dispatchers, globalState, message);
  } else if (command === 'help') {
    client.commands.get('help').execute(args, client, message);
  } else if (command === 'playing') {
    client.commands.get('playing').execute(client, globalState, dispatchers, message)
  } else if (command === 'loop') {
    client.commands.get('loop').execute(client, dispatchers, globalState, message)
  }
});
