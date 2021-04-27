const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'end',
  description: 'ends the current song',

  execute(client, dispatchers, message) {
    const ambienceBotChannel = message.guild.members.cache.get(client.user.id)
      .voice;

    const error = handleDiscordBotErrors(
      dispatchers,
      client,
      message,
      this.name
    );
    console.log('this is our error', error);
    if (error !== undefined) {
      message.channel.send(error);
      return;
    }

    dispatchers[ambienceBotChannel.channelID].destroy();
    dispatchers[ambienceBotChannel.channelID].on('error', (error) => {
      console.log(error);
    });
    delete dispatchers[ambienceBotChannel.channelID];
  },
};