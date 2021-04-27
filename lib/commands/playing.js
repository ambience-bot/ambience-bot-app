const handleDiscordBotErrors = require('../utils/errorHandling')

module.exports = {
    name: 'playing',
    description: 'posts link to current ambience',


    execute(client, globalState, dispatchers, message) {
        const currentSongUrl =  `https://www.youtube.com/watch?v=${
            Array.from(client.songIds.values())[globalState.id]
          }`
         
        const ambienceBotChannel = message.guild.members.cache.get(client.user.id).voice;
        if (!dispatchers[ambienceBotChannel.channelID]) {
        return message.channel.send('There is no ambience playing')
          }
       
        return message.channel.send(currentSongUrl) 
    }

}