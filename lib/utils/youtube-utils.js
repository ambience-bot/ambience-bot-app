const getVideoIdBySearchQuery = async (query) => {
    const fetch = require('node-fetch');
    const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?order=viewCount&q=${query}+ambience&type=video&key=${process.env.YOUTUBE_API_KEY}&part=snippet`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    )
    const responseJson = await youtubeResponse.json();
    const videoId = responseJson.items[0].id.videoId;
    return videoId;
};

module.exports = {
    getVideoIdBySearchQuery
};