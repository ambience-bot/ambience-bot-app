const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'pause',
  description: 'pause the current song.',

  execute(client, dispatchers, message) {
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

    dispatchers[ambienceBotChannel.channelID].pause(true);

    dispatchers[ambienceBotChannel.channelID].on('error', (error) => {
      console.log(error);
    });
  },
};
