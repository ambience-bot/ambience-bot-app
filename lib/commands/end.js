module.exports = {
    name: 'end',
    description: 'Ambience has been ended',

    execute(client, dispatchers, message) {
        const voiceChannel = message.member.voice.channel;

        const ambienceBotChannel = message.guild.members.cache.get(client.user.id).voice;

        if (!voiceChannel) return message.channel.send(
            'You need to be in the same voice channel to end the music ✋✋✋'
        );
        if (voiceChannel.id !== ambienceBotChannel.channelID) return message.channel.send('You need to be in the same voice channel to end the music ✋✋✋'
        );

        if (!ambienceBotChannel) return message.channel.send(
            'Ambience Bot is not playing in this server'
        );

        if(!dispatchers[ambienceBotChannel.channelID]) return message.channel.send(
            'There is no ambience to end!'
        );

        dispatchers[ambienceBotChannel.channelID].destroy();
        dispatchers[ambienceBotChannel.channelID].on('error', (error) => {
            console.log(error)
        })
        delete dispatchers[ambienceBotChannel.channelID]
    }
}