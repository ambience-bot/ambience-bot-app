const handleDiscordBotErrors = (dispatchers, client, message, command) => {
  const voiceChannel = message.member.voice.channel;
  const ambienceBotChannel = message.guild.members.cache.get(client.user.id)
    .voice.channel;
    const ambienceBotVoiceState = message.guild.members.cache.get(client.user.id)
    .voice;
  const baselineCommandsList = ['next', 'previous', 'pause', 'end', 'resume', 'loop', 'favorites', 'delete', 'save', 'playing'];
  
  if (baselineCommandsList.includes(command)) {
    if (!ambienceBotChannel)
      return 'Ambience Bot is not playing in this server';
    if (!voiceChannel)
      return `You need to be in a voice channel to ${command} 🤢🤢🤔`;
    if (voiceChannel.id != ambienceBotVoiceState.channelID) 
      return  `You need to be in the same voice channel as the bot to ${command} music 🤢🤢🤔`;
    if (!dispatchers[ambienceBotVoiceState.channelID])
      return `There is no ambience to ${command}!`;
  }
};

module.exports = handleDiscordBotErrors;
