const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
    name: 'save',
    description: 'saves ambience to favorites',

execute(indexPropertiesObject) {
    const { client, dispatchers, message, globalState } = indexPropertiesObject;

    const error = handleDiscordBotErrors(
        dispatchers,
        client,
        message,
        this.name
      );
  
      if (error !== undefined) {
        return message.channel.send(error);
      }

    const favoritedAmbience = Array.from(client[`${message.guild.id}SongIds`].values())[globalState.id]

    client[`${message.guild.id}Favorites`].set(`${globalState.id}${favoritedAmbience}`, favoritedAmbience);
    return message.channel.send(`you saved the following ambience: https://www.youtube.com/watch?v=${favoritedAmbience}`)
  }
}