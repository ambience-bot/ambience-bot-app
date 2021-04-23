module.exports = {
    name: 'resume',
    description: 'The current ambience has been resumed',

    execute(client, dispatchers, message) {
        const voiceChannel = message.member.voice.channel;

        const ambienceBotChannel = message.guild.members.cache.get(client.user.id).voice;

        if (!voiceChannel) return message.channel.send(
            'You need to be in the same voice channel as the bot to resume music 🤢🤢🤔'
        );
        if (voiceChannel.id !== ambienceBotChannel.channelID) 
            return message.channel.send(
                'You need to be in the same voice channel as the bot to resume music 🤢🤢🤔'
            ); 
        if (!ambienceBotChannel) 
            return message.channel.send(
                'Ambience Bot is not playing music in this server'
            );

        dispatchers[ambienceBotChannel.channelID].resume(message);

        dispatchers[ambienceBotChannel.channelID].on('error', (error) => {
            console.log(error)
        });
    },
};