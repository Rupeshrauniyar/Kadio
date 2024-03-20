var api = "AIzaSyD1RwvdGq14O69Oq2mVYhw--HjEPdEl-Vo"
var main = document.querySelector('main');
var form = document.querySelector('form');
var searchInput = document.getElementById('search');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    var searchTerm = searchInput.value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${api}&q=${searchTerm}`)
        .then(res => res.json())
        .then((data) => {
            var clutter = "";
            data.items.forEach((el) => {
                clutter += `<div class="img">
                    <img src=${el.snippet.thumbnails.high.url} alt="">
                </div>
                <div class="title">
                    <h3>${el.snippet.title}</h3>
                </div>
                <div class="channel">
                    <h3>${el.snippet.channelTitle}</h3>
                </div>
                <div class="channel">
                    <a href="https://youtu.be/${el.id.videoId}">Play Video</a>
                </div>`;
            });
            main.innerHTML = clutter;
        });
});
