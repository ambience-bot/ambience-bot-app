const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'nextfavorite',
  description: 'play next song in favorites queue.',
  async execute(indexPropertiesObject) {
    const { client, dispatchers, globalState, message, voiceChannel } = indexPropertiesObject;
    globalState.id++;

    const streamOptions = { seek: 0, volume: 2.5 };
    
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

    voiceChannel.join().then((connection) => {
      const stream = ytdl(
        `https://www.youtube.com/watch?v=${
          Array.from(client[`${message.guild.id}Favorites`].values())[globalState.id]
        }`,
        {
          filter: 'audioonly',
        }
      );

      
      dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);


      dispatchers[voiceChannel.id].on('finish', () => {
        if (globalState.id === Array.from(client[`${message.guild.id}Favorites`].values()).length)
          message.channel.send('There are no more songs in the favorites queue');
        this.execute(indexPropertiesObject);
      });
    });
  },
};
