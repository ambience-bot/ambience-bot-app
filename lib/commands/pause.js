const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'pause',
  description: 'pause the current song.',

  execute(indexPropertiesObject) {
    const { client, dispatchers, message } = indexPropertiesObject;

    const ambienceBotChannel = message.guild.members.cache.get(client.user.id)
      .voice;

    const error = handleDiscordBotErrors(
      dispatchers,
      client,
      message,
      this.name
    );

    if (error !== undefined) {
      return message.channel.send(error);
    }

    dispatchers[ambienceBotChannel.channelID].pause(true);

    dispatchers[ambienceBotChannel.channelID].on('error', (error) => {
      console.log(error);
    });
  },
};
