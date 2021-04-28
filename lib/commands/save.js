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
        message.channel.send(error);
        return;
      }

    const favoritedSong = Array.from(client[`${message.guild.id}SongIds`].values())[globalState.id]

    client[`${message.guild.id}Favorites`].set(`${globalState.id}${favoritedSong}`, favoritedSong);

    
 }
}