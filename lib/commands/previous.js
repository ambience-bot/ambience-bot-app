const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'previous',
  description: 'play previous song in queue.',
  async execute(indexPropertiesObject) {
    const { client, dispatchers, globalState, message, voiceChannel } = indexPropertiesObject;
    if (globalState.id === 0) {
      return message.channel.send('There are no songs to go back to!');
    }
    globalState.id--;

    const streamOptions = { seek: 0, volume: 2.5 };
    
    const error = handleDiscordBotErrors(
      dispatchers,
      client,
      message,
      this.name
    );

    if (error !== undefined) {
      return message.channel.send(error);
    }


    voiceChannel.join().then((connection) => {
      const stream = ytdl(
        `https://www.youtube.com/watch?v=${
          Array.from(client[`${message.guild.id}SongIds`].values())[globalState.id]
        }`,
        {
          filter: 'audioonly',
        }
      );

      dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);

      dispatchers[voiceChannel.id].on('finish', () => {
        if (globalState.id === Array.from(client[`${message.guild.id}SongIds`].values()).length)
          return message.channel.send('There are no more songs in the queue');
        
      this.execute(indexPropertiesObject);
      });
    });
  },
};
