var api= "AIzaSyAFKbXCVMgZiCb343TIx5zR0BCIUTBQSvg";
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
var searchApi = "AIzaSyAFKbXCVMgZiCb343TIx5zR0BCIUTBQSvg";
var main2 = document.querySelector('#main2');
var form = document.querySelector('#form2');
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

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=14&chart=mostPopular&regionCode=IN&key=${api}&q=new trending movies songs`)
   
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

 
 
 
 form.addEventListener('submit', function (event) {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value; // Use searchInput.value instead of search
    
    event.preventDefault(); 
  

    
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&regionCode=IN&key=${searchApi}&q=${searchTerm}`)

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
                       
            main2.innerHTML = clutter2;
 
 
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
        flag = 1;
    } else {
        currentIndex = details.length - 1; // Set currentIndex to the last index
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
}) 
 
 
 
 
    var swiper = new Swiper(".mySwiper1", {
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









var page1 = document.querySelector('.page1');
var page2 = document.querySelector('.page2');
var page1Button = document.querySelector('#page1Button');
var page2Button = document.querySelector('#page2Button');
var library = document.querySelector('#library')
var buttons = document.getElementsByTagName('button')





page2Button.addEventListener('click', () =>{
page2.style.transform ="translate(0,0)"
page2Button.classList.add('active');
page1Button.classList.remove('active');
library.classList.remove('active')
});

page1Button.addEventListener('click', () =>{
page2.style.transform ="translate(100%,0)"
page1Button.classList.add('active');
page2Button.classList.remove('active');
library.classList.remove('active')
});

library.addEventListener('click', () =>{
library.classList.add('active')
page1Button.classList.remove('active');
page2Button.classList.remove('active');
});














