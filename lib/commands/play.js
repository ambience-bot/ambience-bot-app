const { addVideoIdsToIdCollection } = require('../utils/youtube-utils');
const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  description: 'play a new song.',
  async execute(indexPropertiesObject) {
    const { args, client, dispatchers, globalState, message, voiceChannel } = indexPropertiesObject;
    const query = args.join(' ');
    if (globalState.id === 0) {
      Array.from(client[`${message.guild.id}SongIds`].keys()).forEach((id) =>
        client.songIds.delete(id)
      );

      await addVideoIdsToIdCollection(query, client, message.guild.id);

      if (Array.from(client[`${message.guild.id}SongIds`].values()).length === 0) {
        return message.channel.send(
          'There was a problem with your search, please try again!'
        );
      }
    }

    const streamOptions = { seek: 0, volume: 2.5 };

    if (!voiceChannel)
      return message.channel.send(
        'Please enter a voice channel before attempting to play 👮‍♂️👮‍♀️'
      );

    voiceChannel.join().then((connection) => {
      if (globalState.id === 0)
        message.channel.send(`Playing ${query} ambience`);
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
        globalState.id++;
        if (globalState.id === Array.from(client[`${message.guild.id}SongIds`].values()).length)
          message.channel.send('There are no more songs in the queue');
        this.execute(indexPropertiesObject);
      });
    });
  },
};
