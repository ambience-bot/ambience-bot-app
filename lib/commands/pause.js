module.exports = {
    name: 'pause',
    description: 'Ambience has been paused',

    execute(client, dispatchers, message) {
        const voiceChannel = message.member.voice.channel;

        const ambienceBotChannel = message.guild.members.cache.get(client.user.id).voice;

        if (!voiceChannel) return message.channel.send(
            'You need to be in the same voice channel as the bot to pause music 🤢🤢🤔'
        );
        if (voiceChannel.id !== ambienceBotChannel.channelID) 
            return message.channel.send(
                'You need to be in the same voice channel as the bot to pause music 🤢🤢🤔'
            ); 
        if (!ambienceBotChannel) 
            return message.channel.send(
                'Ambience Bot is not playing music in this server'
            );
        
        dispatchers[ambienceBotChannel.channelID].pause(true);

        dispatchers[ambienceBotChannel.channelID].on('error', (error) => {
            console.log(error)
        })
    }
}