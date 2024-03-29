const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'favorites',
  description: 'plays the list of favorites',

  execute(indexPropertiesObject) {
    const {
      client,
      dispatchers,
      message,
      globalState,
      voiceChannel,
    } = indexPropertiesObject;

    const streamOptions = { seek: 0, volume: 2.5 };

    console.log('favorites array', Array.from(client[`${message.guild.id}Favorites`].values()))

    if (
      Array.from(client[`${message.guild.id}Favorites`].values()).length === 0
    )
      return message.channel.send('Please add some ambience to your favorites list before attempting to play');

    voiceChannel.join().then((connection) => {
      if (globalState.id === 0)
        message.channel.send(`Playing favorite ambiences`);
      const stream = ytdl(
        `https://www.youtube.com/watch?v=${
          Array.from(client[`${message.guild.id}Favorites`].values())[
            globalState.id
          ]
        }`,
        {
          filter: 'audioonly',
        }
      );
      dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);

      const error = handleDiscordBotErrors(
        dispatchers,
        client,
        message,
        this.name
      );
  
      if (error !== undefined) {
        return message.channel.send(error);
      }

      dispatchers[voiceChannel.id].on('finish', () => {
        globalState.id++;
        if (globalState.id === Array.from(client[`${message.guild.id}Favorites`].values()).length)
          return message.channel.send('There are no more favorites in the queue');
       
      this.execute(indexPropertiesObject);
      });
    });
    globalState.playlist = 'Favorites';
  },
};
