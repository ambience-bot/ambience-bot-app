const { getVideoIdBySearchQuery } = require('../utils/youtube-utils');
const ytdl = require('ytdl-core');


module.exports = {
    name: 'play',
    description: 'Ambience has been started',
    execute(args, dispatchers, message) {
        const streamOptions = { seek: 0, volume: 2.5};
        const voiceChannel = message.member.voice.channel;
        
        if(!voiceChannel) return message.channel.send('Please enter a voice channel before attempting to play 👮‍♂️👮‍♀️')

        const query = args.join(' ')

        voiceChannel.join().then(async (connection) => {
            const firstVideoResultId = await getVideoIdBySearchQuery(query);

            message.channel.send(`Playing ${query} ambience`);
            const stream = ytdl(
                `https://www.youtube.com/watch?v=${firstVideoResultId}`, 
                {
                    filter: 'audioonly',
                });

        dispatchers[voiceChannel.id] = connection.play(stream, streamOptions)
            dispatchers[voiceChannel.id].on('finish', () => {
                delete dispatchers[voiceChannel.id]
                voiceChannel.leave()
             })       
        })
            .catch((err) => console.log(err))
    }
}