// const addVideoIdsToIdCollection = async (query, client, guild) => {
    
//   const videoArray = ['rUWxSEwctFU', 'NCFg7G63KgI'];
//   videoArray.map((item, index) => {
//     client[`${guild}SongIds`].set(index, item);
//   });
// };

// module.exports = {
//   addVideoIdsToIdCollection,
// };
const addVideoIdsToIdCollection = async (query, client, guild) => {
  const fetch = require('node-fetch');
  const youtubeResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?&maxResults=50&q=${query}+ambience&type=video&key=${process.env[`YOUTUBE_API_KEY_${Math.ceil(Math.random()*3)}`]}&part=snippet`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const responseJson = await youtubeResponse.json();
  
  responseJson.items.map((item) => {
    client[`${guild}SongIds`].set(item.snippet.title, item.id.videoId);
  });
  
};

module.exports = {
  addVideoIdsToIdCollection,
};
