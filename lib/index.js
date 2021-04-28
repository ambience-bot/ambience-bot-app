const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const dispatchers = {};
const globalState = {};
const embeddedWelcome = require('./utils/embeddedWelcome');

client.once('ready', () => {
  console.log('Ready!');
  
});

client.login(process.env.DISCORD_TOKEN);

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  channel.send(embeddedWelcome)
 // client.user.setAvatar('./assets/ambi.jpg');
  globalState[guild.id] = {};
  client[`${guild.id}SongIds`] = new Discord.Collection();
  client[`${guild.id}Favorites`] = new Discord.Collection();
  
})

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync(`${__dirname}/./commands`)
  .filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.on('message', (message) => {
  
  
  const prefix = '!';

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.get(command)) return message.channel.send(`${message.content} is not a command`);

  console.log("YOYOYOYO", message.content)

  const voiceChannel = message.member.voice.channel;
  const guild = message.guild.id;
  if(command === 'play' || command === 'favorites') globalState[guild].id = 0;

  client.commands.get(command).execute({args, client, dispatchers, globalState: globalState[guild], message, voiceChannel})
});
