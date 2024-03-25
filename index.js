var api= "AIzaSyATXbksyLMtLlW3Ycp59CyB2yX2V8Do0to";
var ytinp = document.getElementById('ytId');
var go = document.getElementById('go');


var play = document.getElementById('play')
var forward = document.getElementById('forward')
var backward = document.getElementById('backward')
var download = document.getElementById('download')

var play1 = document.getElementById('play1')
var forward1 = document.getElementById('forward1')
var backward1 = document.getElementById('backward1')
var download1 = document.getElementById('download1')
var loop1 = document.getElementById('loop1')



var audio = new Audio();
var flag = 0
audio.autoplay = true;
audio.loop = false;
var hindi = document.getElementById('hindi');
var loveRomantic = document.getElementById('love-romantic');
var rap = document.getElementById('rap');
var old = document.getElementById('1990s');
var searchApi = "AIzaSyATXbksyLMtLlW3Ycp59CyB2yX2V8Do0to";
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
            'X-RapidAPI-Key': '13c79cfbefmsh046a866802914b2p1d26e4jsnafee58a5a0f5',
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
    var playerTitleElement = document.querySelector('#videoTitle');
var playerChannelElement = document.querySelector('.player-title #channel');


var playerMoreDisImg = document.querySelector('#playerMoreDisImg');
var playerMoreVideoTitle = document.querySelector('#playerMoreVideoTitle')
var playerMoreChannelTitle = document.querySelector('#playerMoreChannelTitle')

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
                    play1.classList="ri-pause-line";
                    var videoId = this.getAttribute('data-video');
         playerImgElement.src = this.getAttribute('data-img');
        playerTitleElement.textContent = this.getAttribute('data-title');
     playerChannelElement.textContent = this.getAttribute('data-channel');

playerMoreDisImg.src= this.getAttribute('data-img');
playerMoreVideoTitle.textContent = this.getAttribute('data-title')
playerMoreChannelTitle.textContent = this.getAttribute('data-channel') 
                    let currentIndex = 0;

                  
                    function playPreviousSong() {
                        if (currentIndex > 0) {
                            currentIndex--;
                            play.classList = "ri-pause-line";
                            play1.classList="ri-pause-line";
                            flag=1
                        } else {
                            currentIndex = details.length - 1;
                        }
                        var currentDetail = details[currentIndex];
                        updatePlayer(currentDetail);
                    }
                    
                   
                    function playNextSong() {
                        if (currentIndex < details.length - 1) {
                            currentIndex++;
                            play.classList = "ri-pause-line";
                            play1.classList="ri-pause-line";
                            flag=1
                        } else {
                            currentIndex = 0;
                        }
                        var currentDetail = details[currentIndex];
                        updatePlayer(currentDetail);
                    }
                    audio.addEventListener('ended', playNextSong);

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
                        
                        playerMoreDisImg.src = playerImg;
                  playerMoreVideoTitle.textContent = playerTitle;
                  playerMoreChannelTitle.textContent = playerChannel;   
                    }

                    forward.addEventListener('click', playNextSong);
                    backward.addEventListener('click', playPreviousSong);
                    play.addEventListener('click',playPause)
                    
                    forward1.addEventListener('click', playNextSong);
                    backward1.addEventListener('click', playPreviousSong);
                    play1.addEventListener('click',playPause)
                    
                    
                    
                    ytinp.value = videoId;
                    go.click();
                    audio.play();
                });
            });
        });

 
                    function playPause(){
                                        
                    if (flag===1) {
                    audio.pause();
                    flag=0;
                    play.classList="ri-play-line";
                    play1.classList="ri-play-line";
                    }
                     else {
                    audio.play();
                    flag=1;
                    play.classList="ri-pause-line";
                    play1.classList="ri-pause-line";
                    }
                                        
 
                                         }
 
 
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
                    play1.classList="ri-pause-line";
                    var videoId = this.getAttribute('data-video');
         playerImgElement.src = this.getAttribute('data-img');
        playerTitleElement.textContent = this.getAttribute('data-title');
     playerChannelElement.textContent = this.getAttribute('data-channel');

playerMoreDisImg.src= this.getAttribute('data-img');
playerMoreVideoTitle.textContent = this.getAttribute('data-title')
playerMoreChannelTitle.textContent = this.getAttribute('data-channel') 
                    let currentIndex = 0;

                    function playNextSong() {
                        if (currentIndex < details.length - 1) {
                            currentIndex++;
                            play.classList = "ri-pause-line";
                            play1.classList="ri-pause-line";
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
                            play1.classList="ri-pause-line";
                            flag=1
                        } else {
                            currentIndex = details.length - 1;
                        }
                        var currentDetail = details[currentIndex];
                        updatePlayer(currentDetail);
                    }
                    
                    if (loopOn===0) {
                    audio.addEventListener('ended', playNextSong); 
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
                        
                        playerMoreDisImg.src = playerImg;
                  playerMoreVideoTitle.textContent = playerTitle;
                  playerMoreChannelTitle.textContent = playerChannel;   
                    }

                    forward.addEventListener('click', playNextSong);
                    backward.addEventListener('click', playPreviousSong);
                    play.addEventListener('click',playPause)
                    
                    forward1.addEventListener('click', playNextSong);
                    backward1.addEventListener('click', playPreviousSong);
                    play1.addEventListener('click',playPause)
                    
                    
                    
                    ytinp.value = videoId;
                    go.click();
                    audio.play();
                });
            });
        });
        });
 
                    function playPause(){
                                        
                    if (flag===1) {
                    audio.pause();
                    flag=0;
                    play.classList="ri-play-line";
                    play1.classList="ri-play-line";
                    }
                     else {
                    audio.play();
                    flag=1;
                    play.classList="ri-pause-line";
                    play1.classList="ri-pause-line";
                    }
                                        
 
                                         }
                                         
                           
                                    
                                         
 
 
    var swiper = new Swiper(".mySwiper1", {
        slidesPerView: "auto",
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    /* fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=new latest films hindi song`)
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
        }) */
});
 








var page1 = document.querySelector('.page1');
var page2 = document.querySelector('.page2');
var page1Button = document.querySelector('#page1Button');
var page2Button = document.querySelector('#page2Button');
var library = document.querySelector('#library')
var buttons = document.getElementsByTagName('button')
var redirect = document.querySelector('#page2Redirect')




redirect.addEventListener('click',()=>{
page2.style.transform ="translate(0,0)"
page2Button.classList.add('active');
page1Button.classList.remove('active');
library.classList.remove('active') 
})


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







var playerMore = document.querySelector('.playerMore')
var player = document.querySelector('.player-details')



player.addEventListener('click', () =>{
playerMore.style.transform ="translate(0,0)"
});



var loopOn = 0
loop1.addEventListener('click',() =>{
if (loopOn===0) {
loop1.classList.add('active') 
audio.loop = true;
loopOn=1
}else{
loop1.classList.remove('active') 
audio.loop = false;
loopOn=0 
}
})

var downwards1 = document.querySelector('#downwards1')

downwards1.addEventListener('click',() =>{
playerMore.style.transform ="translate(100%,100%)" 
})



document.addEventListener("DOMContentLoaded", function () {
   

   
    var timelineInput = document.querySelector('.timeline input');
    var currentTimeDisplay = document.querySelector('.timeline p:first-of-type');
    var durationDisplay = document.querySelector('.timeline p:last-of-type');

    
    audio.addEventListener('loadedmetadata', function () {
        var durationMinutes = Math.floor(audio.duration / 60);
        var durationSeconds = Math.floor(audio.duration % 60);
        durationDisplay.textContent = durationMinutes + ':' + (durationSeconds < 10 ? '0' : '') + durationSeconds;
    });

    
    audio.addEventListener('timeupdate', function () {
        var currentTimeMinutes = Math.floor(audio.currentTime / 60);
        var currentTimeSeconds = Math.floor(audio.currentTime % 60);
        currentTimeDisplay.textContent = currentTimeMinutes + ':' + (currentTimeSeconds < 10 ? '0' : '') + currentTimeSeconds;
    });

    
    timelineInput.addEventListener('input', function () {
        var newTime = audio.duration * (timelineInput.value / 100);
        audio.currentTime = newTime;
        
     timelineInput.addEventListener('input', function () {
        var newTime = audio.duration * (timelineInput.value / 100);
        audio.currentTime = newTime;
    });

    // Update the range input as the audio playback progresses
    audio.addEventListener('timeupdate', function () {
        var progress = (audio.currentTime / audio.duration) * 100;
        timelineInput.value = progress;
    });
});   
        
audio.addEventListener('timeupdate', function () {
        var progress = (audio.currentTime / audio.duration) * 100;
        timelineInput.value = progress;
    });

    // Update the audio playback position when the timeline input is changed
    timelineInput.addEventListener('input', function () {
        var newTime = audio.duration * (timelineInput.value / 100);
        audio.currentTime = newTime;
    });        
});


