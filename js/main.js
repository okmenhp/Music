// 
const musicBox = document.querySelector('.music-box'),
    musicImg = musicBox.querySelector(".music-image img"),
    musicName = musicBox.querySelector(".music-content__name p"),
    musicArtist = musicBox.querySelector(".music-content__artist h2"),
    mainAudio = musicBox.querySelector("#main-audio"),
    playPauseBtn = musicBox.querySelector(".play-pause"),
    prevBtn = musicBox.querySelector("#prev"),
    nextBtn = musicBox.querySelector("#next"),
    progressArea = musicBox.querySelector(".progress-area"),
    progressBar = musicBox.querySelector(".progress-bar")
    // Load list music
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `./img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}
// Event play music
function playMusic() {
    mainAudio.classList.add("paused")
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play()
    favoriteBtn.innerText = "favorite_border"
    favoriteBtn.style.color = "#959ba7"
}
// Event pause music
function pauseMusic() {
    mainAudio.classList.remove("paused")
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause()
}
// Load music
let musicIndex = 1;
window.addEventListener("load", () => {
        loadMusic(musicIndex);
        playingNow()
    })
    // Check event play-pause
playPauseBtn.addEventListener("click", () => {
        const isMusicPaused = mainAudio.classList.contains("paused");
        isMusicPaused ? pauseMusic() : playMusic();
        playingNow()
    })
    // Event next music
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex);
    mainAudio.play()
    const isMusicPaused = mainAudio.classList.contains("paused");
    playMusic();
    playingNow()
}
// Event prev music
function prevMusic() {
    musicIndex--;
    musicIndex < allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex);
    mainAudio.play()
    playMusic();
    playingNow()
}
nextBtn.addEventListener("click", () => {
    nextMusic()
})
prevBtn.addEventListener("click", () => {
        prevMusic()
    })
    // Event update time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = musicBox.querySelector(".current"),
        musicDuration = musicBox.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerHTML = `${totalMin}:${totalSec}`;
    });
    // updateplaying song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`;

});
progressArea.addEventListener("click", (e) => {
        let progressWidthval = progressArea.clientWidth;
        let clickedOffSetX = e.offsetX;
        let songDuration = mainAudio.duration;
        mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
        playMusic();
    })
    // Event Repeat music
const repeatBtn = musicBox.querySelector('#repeat-plist')
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one"
            repeatBtn.style.color = "#105efb"
            break
        case "repeat_one":
            repeatBtn.innerText = "repeat"
            repeatBtn.style.color = "#959ba7"
            break
    }
})
mainAudio.addEventListener("ended", () => {
        let getText = repeatBtn.innerText
        switch (getText) {
            case "repeat":
                nextMusic()
                break
            case "repeat_one":
                mainAudio.currentTime = 0
                loadMusic(musicIndex)
                playMusic()
                break
        }
    })
    // 
var openList = document.getElementById('more-music')
var closeList = document.getElementById('close')
openList.addEventListener('click', function() {
    document.getElementById('music-list').classList.add('active')
})
closeList.addEventListener('click', function() {
    document.getElementById('music-list').classList.remove('active')
})
const listMusic = musicBox.querySelector(".music-list-wrapper")
for (let i = 0; i < allMusic.length; i++) {

    let song =
        `<div class="song" item=${i+1}>
            <i id="headphones" class="material-icons-round">headphones</i>
            <div class="song-content">
                <img src="./img/${allMusic[i].img}.jpg" alt="">
                <div class="wrapper">
                    <div class="song-content__name">
                        <p>${allMusic[i].name}</p>
                    </div>
                    <div class="song-content__artist">
                        <p>${allMusic[i].artist}</p>
                    </div>
                </div>
            </div>
            <div class="song-time">
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                <p id="${allMusic[i].src}"></p>
            </div>
        </div>`
    listMusic.insertAdjacentHTML("beforeend", song)
    let audioDurationLoaded = listMusic.querySelector(`#${allMusic[i].src}`)
    let audioTag = listMusic.querySelector(`.${allMusic[i].src}`)
    audioTag.addEventListener("loadeddata", () => {
        let audioDuration = audioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        audioDurationLoaded.innerText = `${totalMin}:${totalSec}`;
    });
}
// Get music playing
const allSong = listMusic.querySelectorAll('.song')

function playingNow() {
    for (let j = 0; j < allSong.length; j++) {
        if (allSong[j].classList.contains("playing")) {
            allSong[j].querySelector('.song i').style.color = "#858c9a"
            allSong[j].querySelector('.song-content__name p').style.color = "#858c9a"
            allSong[j].querySelector('.song-content__artist p').style.color = "#858c9a"
            allSong[j].querySelector('.song-time p').style.color = "#858c9a"
        }
        if (allSong[j].getAttribute("item") == musicIndex) {
            allSong[j].classList.add('playing')
            allSong[j].querySelector('.song i').style.color = "#105efb"
            allSong[j].querySelector('.song-content__name p').style.color = "#105efb"
            allSong[j].querySelector('.song-content__artist p').style.color = "#105efb"
            allSong[j].querySelector('.song-time p').style.color = "#105efb"
        }
        allSong[j].setAttribute("onclick", "clicked(this)");
    }

}

function clicked(element) {
    let getItem = element.getAttribute("item")
    musicIndex = getItem
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}

var favoriteBtn = document.getElementById('favorite')
favoriteBtn.addEventListener('click', function() {
    if (favoriteBtn.innerText === "favorite_border") {
        favoriteBtn.innerText = "favorite"
        favoriteBtn.style.color = "#105efb"
    } else {
        favoriteBtn.innerText = "favorite_border"
        favoriteBtn.style.color = "#959ba7"
    }
})