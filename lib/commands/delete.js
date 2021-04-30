const handleDiscordBotErrors = require('../utils/errorHandling');

module.exports = {
  name: 'delete',
  description: 'deletes a favorite',
  execute(indexPropertiesObject) {
    const { client, dispatchers, globalState, message } = indexPropertiesObject;

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

    const favoriteList = Array.from(client[`${message.guild.id}Favorites`].values())
    const ambienceToDelete = favoriteList[globalState.id];

    if (!favoriteList.length) {
      return message.channel.send('there is no favorites to delete')
    } else if( favoriteList.length === 1) {
      client[`${message.guild.id}Favorites`].sweep(
        (item) => item === ambienceToDelete);
      dispatchers[ambienceBotVoiceState.channelID].destroy();
    } else if(favoriteList[favoriteList.length - 1] === ambienceToDelete) {
      client[`${message.guild.id}Favorites`].sweep(
      (item) => item === ambienceToDelete);
      client.commands.get('previous').execute(indexPropertiesObject)
    } else { 
      client[`${message.guild.id}Favorites`].sweep(
        (item) => item === ambienceToDelete);
      globalState.id--
      client.commands.get('next').execute(indexPropertiesObject) 
    } 

      

    
    
    

    

    
   
    
   
    
    
  }
};
