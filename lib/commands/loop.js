const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
    name: 'loop',
    description: 'plays ambience on a loop',

async execute(client, dispatchers, globalState, message, voiceChannel) {
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

    const currentSongId = Array.from(client.songIds.values())[globalState.id]
    
    const streamOptions = { seek: 0, volume: 2.5 };

    const connection = await voiceChannel.join();
    
    const stream = ytdl(
        `https://www.youtube.com/watch?v=${
          currentSongId
        }`,
        {
          filter: 'audioonly',
        })

       

    dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);

    dispatchers[voiceChannel.id].on('finish', () => {
        this.execute(client, dispatchers, globalState, message, voiceChannel);
    })
  }
}