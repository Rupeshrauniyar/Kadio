var searchApi = "AIzaSyD1RwvdGq14O69Oq2mVYhw--HjEPdEl-Vo"
var main = document.querySelector('#main2');
var form = document.querySelector('#form2');
var searchInput = document.getElementById('search');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    var searchTerm = searchInput.value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${searchApi}&q=${searchTerm}`)
        .then(res => res.json())
        .then((data) => {
            var clutter2 = "";
            data.items.forEach((el) => {
                clutter2 += `<div class="container" id=index>
                        <div class="details" data-video="${el.id.videoId}" data-img="${el.snippet.thumbnails.high.url}" data-title="${el.snippet.title}" data-channel="${el.snippet.channelTitle}">
                            <div class="img">
                                <img src=${el.snippet.thumbnails.high.url} alt="">
                            </div>                
                            <div class="title">
                                <h3>${el.snippet.title}</h3><br>                        
                                <p id="channel">${el.snippet.channelTitle}</p>
                            </div>
                        </div>
                    </div>`;
            });
            main.innerHTML = clutter2;
        });
});
