const ytdl = require('ytdl-core');
const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'previous',
  description: 'play previous song in queue.',
  async execute(args, client, dispatchers, globalState, message) {
    if (globalState.id === 0) {
      return message.channel.send('There are no songs to go back to!');
    }
    globalState.id--;
    const query = args.join(' ');

    console.log(globalState);

    const streamOptions = { seek: 0, volume: 2.5 };
    const voiceChannel = message.member.voice.channel;
    const ambienceBotChannel = message.guild.members.cache.get(client.user.id)
      .voice;

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

    voiceChannel.join().then(async (connection) => {
      if (globalState.id === 0)
        message.channel.send(`Playing ${query} ambience`);
      const stream = ytdl(
        `https://www.youtube.com/watch?v=${
          Array.from(client.songIds.values())[globalState.id]
        }`,
        {
          filter: 'audioonly',
        }
      );

      dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);

      dispatchers[voiceChannel.id].on('finish', () => {
        if (globalState.id === Array.from(client.songIds.values()).length)
          message.channel.send('There are no more songs in the queue');
        this.execute(args, client, dispatchers, globalState, message);
      });
    });
  },
};
