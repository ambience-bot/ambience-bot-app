const ytdl = require('ytdl-core');

module.exports = {
  name: 'next',
  description: 'play next song in queue',
  async execute(args, client, dispatchers, globalState, message) {
    globalState.id++;
    const query = args.join(' ');

    console.log(globalState);

    const streamOptions = { seek: 0, volume: 2.5 };
    const voiceChannel = message.member.voice.channel;
    const ambienceBotChannel = message.guild.members.cache.get(client.user.id)
      .voice;

    if (!voiceChannel)
      return message.channel.send(
        'Please enter a voice channel before attempting to play 👮‍♂️👮‍♀️'
      );

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

      if (!voiceChannel)
        return message.channel.send(
          'You need to be in the same voice channel as the bot to pause music 🤢🤢🤔'
        );
      if (voiceChannel.id !== ambienceBotChannel.channelID)
        return message.channel.send(
          'You need to be in the same voice channel as the bot to pause music 🤢🤢🤔'
        );
      if (!ambienceBotChannel)
        return message.channel.send(
          'Ambience Bot is not playing in this server'
        );

      if (!dispatchers[ambienceBotChannel.channelID])
        return message.channel.send('There is no ambience to pause!');

      dispatchers[voiceChannel.id] = connection.play(stream, streamOptions);

      dispatchers[voiceChannel.id].on('finish', () => {
        if (globalState.id === Array.from(client.songIds.values()).length)
          message.channel.send('There are no more songs in the queue');
        this.execute(args, client, dispatchers, globalState, message);
      });
    });
  },
};
