var api= "AIzaSyAC0HkVA6U_CMp0rSGvGK_5ZFh6XMqlE5I";
var ytinp = document.getElementById('ytId');
var go = document.getElementById('go');
var play = document.getElementById('play')
var forward = document.getElementById('forward')
var backward = document.getElementById('backward')
var download = document.getElementById('download')
var audio = new Audio();
var flag = 0
audio.autoplay = true;
audio.loop = false;
var hindi = document.getElementById('hindi');
var loveRomantic = document.getElementById('love-romantic');
var rap = document.getElementById('rap');
var old = document.getElementById('1990s');

$(document).ready(() => {
    $('#ytForm').submit(async (event) => {
        event.preventDefault();
        await mp3Conversion($('#ytId').val());
    });
});

async function mp3Conversion(id) {
    if (!id) return;
    $('#failAlert').addClass('d-none');
    $('#resultContainer').css('height', '0').removeClass('fadeIn');
    $('#videoTitle').text("");
    $('#downloadLink').attr('href', "");
    $('#audio').attr('src', "");
    $('.spinner').removeClass('d-none');
    const url = 'https://youtube-mp36.p.rapidapi.com/dl?id=' + id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd41976062emsh2e96da914215d07p1a2f64jsn2d9a309d913c',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    let response = await fetch(url, options).then((response) => response.json());

    if (response.status == "processing") {
        setTimeout(async function () {
            response = await fetch(url, options).then((response) => response.json());
        }, 1000);
    }

    $('.spinner').addClass('d-none');

    if (response.status == "fail") {
        $('#failAlert').removeClass('d-none');
    } else {
        $('#videoTitle').text(response.title);
        $(audio).attr('src', response.link);
        download.addEventListener('click', function () {
            window.location.assign(response.link)
        })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var main = document.querySelector('main');
    var playerImgElement = document.querySelector('.player-img img');
    var playerTitleElement = document.querySelector('.player-title h3');
var playerChannelElement = document.querySelector('.player-title #channel');

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=14&chart=mostPopular&regionCode=IN&key=${api}&q=all new trending movie songs`)
   
        .then(res => res.json())
        .then((data) => {
            var clutter = "";
            data.items.forEach((el, index) => {
                clutter += `
                    <div class="container" id=index>
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
            main.innerHTML = clutter;

            var details = document.querySelectorAll('.details');
            details.forEach(detail => {
                detail.addEventListener('click', function (indx) {
                    flag = 1
                    play.classList = "ri-pause-line";
                    var videoId = this.getAttribute('data-video');
                    playerImgElement.src = this.getAttribute('data-img');
                    var playerTitle = this.getAttribute('data-title');
     playerChannelElement.textContent = this.getAttribute('data-channel');

                    let currentIndex = 0;

                    function playNextSong() {
                        if (currentIndex < details.length - 1) {
                            currentIndex++;
                            play.classList = "ri-pause-line";
                            flag=1
                        } else {
                            currentIndex = 0;
                        }
                        var currentDetail = details[currentIndex];
                        updatePlayer(currentDetail);
                    }

                    function playPreviousSong() {
                        if (currentIndex > 0) {
                            currentIndex--;
                            play.classList = "ri-pause-line";
                            flag=1
                        } else {
                            currentIndex = details.length - 1;
                        }
                        var currentDetail = details[currentIndex];
                        updatePlayer(currentDetail);
                    }

                    function updatePlayer(currentDetail) {
                        var videoId = currentDetail.getAttribute('data-video');
                        var playerImg = currentDetail.getAttribute('data-img');
                        var playerTitle = currentDetail.getAttribute('data-title');
                        var playerChannel = currentDetail.getAttribute('data-channel');


                        ytinp.value = videoId;
                        go.click();
                        audio.play();
                        
                        // Update player details
                        playerImgElement.src = playerImg;
                        playerTitleElement.textContent = playerTitle;
                        playerChannelElement.textContent = playerChannel;
                    }

                    forward.addEventListener('click', playNextSong);
                    backward.addEventListener('click', playPreviousSong);

                    ytinp.value = videoId;
                    go.click();
                    audio.play();
                });
            });
        });

    var swiper = new Swiper(".mySwiper2", {
        slidesPerView: "auto",
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=new latest films hindi song`)
        .then(res => res.json())
        .then((data) => {
            data.items.forEach((el) => {
                hindi.src = `${el.snippet.thumbnails.high.url}`
            });
        })

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=new latest film love songs`)
        .then(res => res.json())
        .then((data) => {
            data.items.forEach((el) => {
                loveRomantic.src = `${el.snippet.thumbnails.high.url}`
            });
        })

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=new latest rap songs`)
        .then(res => res.json())
        .then((data) => {
            data.items.forEach((el) => {
                rap.src = `${el.snippet.thumbnails.high.url}`
            });
        })
});
              
   play.addEventListener('click', function(){
    if (flag === 1) {
        audio.pause();
        flag = 0;
        play.classList="ri-play-line"
    } else {
        flag = 1;
        audio.play(); 
        play.classList="ri-pause-line"
    }
});




var papa = document.querySelector('.papa');
var player = document.querySelector('.player');
var isDragging = false; // flag to track dragging state
var startY; // stores the initial Y position of the mouse or touch
var startOffsetY; // stores the initial offset of the player from the top
var minPosition = 0; // Minimum position from the top of the page
var maxPosition = window.innerHeight - player.offsetHeight; // Maximum position from the top of the page

// Mouse event listeners
player.addEventListener('mousedown', startDragging);
papa.addEventListener('mousemove', dragPlayer);
papa.addEventListener('mouseup', stopDragging);

// Touch event listeners
player.addEventListener('touchstart', startDragging);
papa.addEventListener('touchmove', dragPlayer);
papa.addEventListener('touchend', stopDragging);

function startDragging(e) {
    isDragging = true;
    if (e.type === 'mousedown') {
        startY = e.clientY;
    } else if (e.type === 'touchstart') {
        startY = e.touches[0].clientY;
    }
    startOffsetY = player.offsetTop;
}

function dragPlayer(e) {
    if (!isDragging) return;

    let newY;
    if (e.type === 'mousemove') {
        newY = e.clientY;
    } else if (e.type === 'touchmove') {
        newY = e.touches[0].clientY;
    }

    let offsetY = newY - startY;
    let newPosition = startOffsetY + offsetY;

    // Ensure the player stays within the page boundaries
    newPosition = Math.max(minPosition, Math.min(newPosition, maxPosition));

    player.style.top = newPosition + "px";
}

function stopDragging() {
    isDragging = false;
}
