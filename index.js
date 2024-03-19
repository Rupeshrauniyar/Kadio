var api = "AIzaSyA6nhHoE0C_PSd8akQZxm38IkoBOiAXAMk";
        var ytinp = document.getElementById('ytId');
        var go = document.getElementById('go');
        var play = document.getElementById('play')
        var audio = new Audio();
        audio.autoplay = true;
        audio.loop = true;
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

 async function mp3Conversion (id) {
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
            'X-RapidAPI-Key': '0e04693360msh44e26ede20ac2ffp1e51f0jsn307d8806270e',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    let response = await fetch(url, options).then((response) => response.json());

    if (response.status == "processing") {
        setTimeout(async function(){
            response = await fetch(url, options).then((response) => response.json());
        }, 1000);
    }

    $('.spinner').addClass('d-none');

    if (response.status == "fail") {
        $('#failAlert').removeClass('d-none');
    } else {
        $('#videoTitle').text(response.title);
        
        $('#downloadLink').attr('href', response.link);
         $(audio).attr('src', response.link);
        $('#resultContainer').css('height', '180px').addClass('fadeIn');
    }  
} 

        document.addEventListener("DOMContentLoaded", function() {
            var main = document.querySelector('main');
            var playerImgElement = document.querySelector('.player-img img');
            var playerTitleElement = document.querySelector('.player-title h3');
            var playerChannelElement = document.querySelector('.player-title #channel');

            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&chart=mostPopular&regionCode=IN&key=${api}&q=all%20trending%20hindi%20music`)
                .then(res => res.json())
                .then((data) => {
                    var clutter = "";
                    data.items.forEach((el) => {
                        clutter += `
                            <div class="container" >
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
var flag = 0
                    var details = document.querySelectorAll('.details');
                    details.forEach(detail => {
                        detail.addEventListener('click', function() {
                            var videoId = this.getAttribute('data-video');   
                            var playerImg = this.getAttribute('data-img');   
                            var playerTitle = this.getAttribute('data-title');   
                            var playerChannel = this.getAttribute('data-channel'); 

                  flag=1 
                   play.classList="ri-pause-line";    
                            
                            

if (playerImgElement.src="") {
playerImgElement.src="https://media.nngroup.com/media/editor/2023/05/18/linkedin_skeletonscreen.jpg"
}
else {
playerImgElement.src = playerImg; 
}

if (playerTitleElement.textContent="") {
playerImgElement.textContent="Loading"
}
else {
playerTitleElement.textContent = playerTitle;
}
if (playerChannelElement.textContent="") {
playerChannelElement.textContent="Loading"
}
else {
playerChannelElement.textContent = playerChannel;
}



play.addEventListener('click', () => {
    if (flag === 0) {
        play.classList = "ri-pause-line";
        audio.play();
        flag = 1;
    } else {
        play.classList = "ri-play-line";
        audio.pause();
        flag = 0;
    }
});





                            ytinp.value = videoId;
                            go.click();
                            audio.play();
                        });
                    });
                })
                .catch(error => console.error('Error fetching trending Hindi music:', error));
        });






var swiper = new Swiper(".mySwiper2", {
      slidesPerView: "auto",
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    





 fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=latest love romantic song`)
        .then(res => res.json())
        .then((data) => {
         data.items.forEach((el) => {
          loveRomantic.src=`${el.snippet.thumbnails.high.url}`
        });
        })
        
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=rap songs`)
        .then(res => res.json())
        .then((data) => {
         data.items.forEach((el) => {
          rap.src=`${el.snippet.thumbnails.high.url}`
        });
        })
        
        
        
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&chart=mostPopular&regionCode=IN&key=${api}&q=1990s song`)
        .then(res => res.json())
        .then((data) => {
         data.items.forEach((el) => {
          old.src=`${el.snippet.thumbnails.high.url}`
        });
        }) 
        
