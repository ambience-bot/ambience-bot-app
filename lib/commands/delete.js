const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'delete',
  description: 'deletes a favorite',
  execute(indexPropertiesObject) {
    const { client, dispatchers, globalState, message } = indexPropertiesObject;
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
    if(Array.from(client[`${message.guild.id}Favorites`].values()).length === 0) return message.channel.send('There are no favorites to delete')
    const ambienceToDelete = Array.from(client[`${message.guild.id}Favorites`].values())[globalState.id]
    client[`${message.guild.id}Favorites`].sweep(item => item === ambienceToDelete)
    console.log(Array.from(client[`${message.guild.id}Favorites`].values())[globalState.id])
    globalState.id--;
    client.commands.get('next').execute(indexPropertiesObject);
  }
}