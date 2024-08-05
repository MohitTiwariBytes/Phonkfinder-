const songList = document.getElementById('song-list');
const refreshButton = document.getElementById('refresh');

// ayo dont steal this token please
const accessToken = 'BQAhsntNORXO4ECUnzfxZzVkN6bJUwqW-faaGuaXL3N_hCcsCfRN4OYDQnrveffZfR5qxrQppHbko_gy31f_VXPehLce0Jez7q7vePaa3GolYhRysB3koLPzd4caOoNH3Hd3M2idjVcCBDSb0WpBqrXbV_TuXOT3uvEJiY5F2mEcZtWMph5Xx3Onyq9Jf9nuZ-VTP1L4y2pVnIWe0xXKj5GVJLnaAAEuQFSW9rLgBZDDi5WRYe2iTYztetakNcpGbDRcsu81NeH42rdAR5tMu2PMmJPoRw';
const apiUrl = 'https://api.spotify.com/v1/search?type=track&q=phonk';

async function fetchSongs() {
    songList.innerHTML = '<p>Loading...</p>';

    try {
        console.log('Fetching songs...');
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`http error! status: ${response.status}`);
        }
        const data = await response.json();
        const tracks = data.tracks.items;
        songList.innerHTML = '';

        if (tracks.length > 0) {
            tracks.forEach(track => {
                const songElement = document.createElement('div');
                songElement.className = 'song';
                songElement.innerHTML = `
                    <img src="${track.album.images[1].url}" alt="${track.name}">
                    <p><strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(', ')}</p>
                `;
                songList.appendChild(songElement);
            });
        } else {
            songList.innerHTML = '<p>no songs found.</p>';
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
        songList.innerHTML = '<p>error something broke in the code.... contact mohit for help</p>';
    }
}

refreshButton.addEventListener('click', () => {
    console.log('Refresh button clicked');
    fetchSongs();
});

fetchSongs();
