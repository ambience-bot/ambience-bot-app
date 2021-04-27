const { VoiceChannel } = require("discord.js");
const { execute } = require("./pause");

module.exports = {
    name: 'playing',
    description: 'posts link to current ambience',

    execute(client, globalState, message) {
        const currentSongUrl =  `https://www.youtube.com/watch?v=${
            Array.from(client.songIds.values())[globalState.id]
          }`
        return message.channel.send(currentSongUrl)
    }

}