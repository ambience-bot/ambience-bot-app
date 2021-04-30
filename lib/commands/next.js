const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'next',
  description: 'play next song in queue.',
  async execute(indexPropertiesObject) {
    const {
      client,
      dispatchers,
      globalState,
      message,
      voiceChannel,
    } = indexPropertiesObject;

    globalState.id++;

    console.log('next', globalState.id)

    

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
          Array.from(
            client[`${message.guild.id}${globalState.playlist}`].values()
          )[globalState.id]
        }`,
        {
          filter: 'audioonly',
        }
      );

      dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);

    if (Array.from(client[`${message.guild.id}${globalState.playlist}`].values())
    .length -1 === globalState.id)
    return message.channel.send('this is the last song in the queue')

      dispatchers[voiceChannel.id].on('finish', () => {
        this.execute(indexPropertiesObject);
      });
    });
  },
};
