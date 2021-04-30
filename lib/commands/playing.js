const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
    name: 'playing',
    description: 'posts link to current ambience',


    execute(indexPropertiesObject) {
      const { client, globalState, dispatchers, message } = indexPropertiesObject;

      const error = handleDiscordBotErrors(
        dispatchers,
        client,
        message,
        this.name
      );
  
      if (error !== undefined) {
        return message.channel.send(error);
      }
        
      const currentSongUrl = `https://www.youtube.com/watch?v=${
        Array.from(client[`${message.guild.id}${globalState.playlist}`].values())[globalState.id]
      }`
           
      return message.channel.send(currentSongUrl) 
  }
}