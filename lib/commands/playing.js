

module.exports = {
    name: 'playing',
    description: 'posts link to current ambience',


    execute(indexPropertiesObject) {
        const { client, globalState, dispatchers, message } = indexPropertiesObject;
        const currentSongUrl = `https://www.youtube.com/watch?v=${
            Array.from(client[`${message.guild.id}SongIds`].values())[globalState.id]
          }`
         
        const ambienceBotChannel = message.guild.members.cache.get(client.user.id).voice;
        if (!dispatchers[ambienceBotChannel.channelID]) {
        return message.channel.send('There is no ambience playing')
          }
       
        return message.channel.send(currentSongUrl) 
    }

}