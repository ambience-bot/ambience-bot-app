const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'end',
  description: 'ends the current song',

  execute(indexPropertiesObject) {
    const { client, dispatchers, message } = indexPropertiesObject;
    
    const ambienceBotVoiceState = message.guild.members.cache.get(client.user.id)
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

    message.guild.voice.channel.leave();

    dispatchers[ambienceBotVoiceState.channelID].destroy();

    dispatchers[ambienceBotVoiceState.channelID].on('error', (error) => {
      console.log(error);
    });
    delete dispatchers[ambienceBotVoiceState.channelID];
  },
};
