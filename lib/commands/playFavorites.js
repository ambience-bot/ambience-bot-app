const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
    name: 'favorites',
    description: 'plays the list of favorites',

    execute(indexPropertiesObject) {
        const { client, dispatchers, message, globalState, voiceChannel } = indexPropertiesObject;

        const error = handleDiscordBotErrors(
            dispatchers,
            client,
            message,
            this.name
          );
      
          if (error !== undefined) {
            message.channel.send(error);
            return;
          }

        const streamOptions = { seek: 0, volume: 2.5 };

        if (Array.from(client[`${message.guild.id}Favorites`].values()).length === 0) return message.channel.send('add some shi bihh');
        

        voiceChannel.join().then((connection) => {
            if (globalState.id === 0) 
              message.channel.send(`Playing favorite ambiences`);
            const stream = ytdl(
              `https://www.youtube.com/watch?v=${
                Array.from(client[`${message.guild.id}Favorites`].values())[globalState.id]
              }`,
              {
                filter: 'audioonly',
              }
            );
           console.log('HELLLOOO', Array.from(client[`${message.guild.id}Favorites`].values()).length)   
            
          
  

         dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);
    })
  }
}