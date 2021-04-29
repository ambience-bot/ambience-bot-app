const Discord = require('discord.js');

const embeddedWelcome = new Discord.MessageEmbed()
    .setColor('BLURPLE')
    .setTitle('Thank you for inviting the Ambience Bot to your channel 👌👋🤘')
    .setDescription(`After joining a voice channel here are your options: 
        !play: play a new ambience.
        !pause: pause the current ambience.
        !resume: resume a ambience that has been paused.
        !next: play next ambience in queue.
        !previous: play previous ambience in queue.
        !end: ends the current ambience.
        !playing: posts current ambience URL.
        !save: saves current ambience to favorites.
        !favorites: plays ambience from favorites.
        !loop: loops current ambience.  
        !help: logs all commands.`)
    .setFooter('🥝🥒🍌🍁🛹')

module.exports = embeddedWelcome;

