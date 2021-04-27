const Discord = require('discord.js');

const embeddedWelcome = new Discord.MessageEmbed()
    .setColor('BLURPLE')
    .setTitle('Thank you for inviting the Ambience Bot to your channel 👌👋🤘')
    .setDescription(`After joining a voice channel here are your options: 
        !play: play a new song.
        !pause: pause the current song.
        !resume: resume a song that has been paused.
        !next: play next song in queue.
        !previous: play previous song in queue.
        !end: ends the current song. 
        !help: logs all commands.`)
    .setFooter('🥝🥒🍌🍁🛹')

module.exports = embeddedWelcome;

