const moodToGenre = {
  happy: "party",
  sad: "acoustic",
  relaxed: "lofi",
  energetic: "workout"
};

async function getSongs() {
  const mood = document.getElementById("mood-select").value;
  const genre = moodToGenre[mood];

  console.log("Fetching token from backend...");

  const tokenRes = await fetch("https://your-backend-url.onrender.com/get-token");
  const { access_token } = await tokenRes.json();

  console.log("Access token received:", access_token);

  const response = await fetch(`https://api.spotify.com/v1/search?q=${genre}&type=track&limit=5`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  const data = await response.json();
  displaySongs(data.tracks.items);
}

function displaySongs(songs) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  songs.forEach(song => {
    const html = `
      <div class="song">
        <h3>${song.name} - ${song.artists[0].name}</h3>
        <audio controls src="${song.preview_url}">Your browser doesn't support audio.</audio>
        <br/>
        <a href="${song.external_urls.spotify}" target="_blank">Open in Spotify</a>
      </div>
    `;
    resultsDiv.innerHTML += html;
  });
}
