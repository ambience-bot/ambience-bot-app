const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'delete',
  description: 'deletes a favorite',
  execute(indexPropertiesObject) {
    const { client, dispatchers, globalState, message } = indexPropertiesObject;

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

    if (
      Array.from(client[`${message.guild.id}Favorites`].values()).length === 0
    )
      return message.channel.send('There are no favorites to delete');
    const ambienceToDelete = Array.from(
      client[`${message.guild.id}Favorites`].values()
    )[globalState.id];

    client[`${message.guild.id}Favorites`].sweep(
      (item) => item === ambienceToDelete
    );

    if (
      Array.from(client[`${message.guild.id}Favorites`].values().length === 0)
    ) {
      dispatchers[ambienceBotChannel.channelID].destroy();
      return message.channel.send('There are no more songs in favorites');
    }

    globalState.id--;
    client.commands.get('next').execute(indexPropertiesObject);
  },
};
