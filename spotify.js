let playbutton=document.querySelector(".circle-container");
let playlistitem=document.querySelector(".p-item");
let currentTrack=new Audio();
playlistitem.addEventListener("mouseover",()=>{
    playbutton.classList.add("playbutton-transition");
    playbutton.classList.remove("display-none");

})
playlistitem.addEventListener("mouseleave",()=>{
    playbutton.classList.remove("playbutton-transition");
    playbutton.classList.add("display-none");
})
let songs=[];
//fetching songs
async function getSongs(){
    let a = await fetch("http://127.0.0.1:3000/projects/spotify/songs");
    let response = await a.text();
    let element=document.createElement("div");
    element.innerHTML=response;
    let as=element.getElementsByTagName("a");
    for (let index = 0; index < as.length; index++) {
        const elmnt = as[index];
        if (elmnt.href.endsWith(".mp3")) {
            songs.push(elmnt.href);
        }
    }
    return songs;
}
function playMusic(track){
    currentTrack.src = "/projects/spotify/songs/"+track+".mp3";
    currentTrack.play();
}
async function parsedSongs(){
    let songs=await getSongs();
    let songList=document.querySelector(".playlist ol");
    songs = songs.sort();
    for (let index = 0; index < songs.length; index++) {
        let song = songs[index];
        let originalUrl = song;
        // Split the URL by '/'
        let urlParts = originalUrl.split('/songs/')[1];
        // Decode the file name to replace '%20' with spaces
        let decodedFileName = decodeURIComponent(urlParts);
        decodedFileName = decodedFileName.slice(0,decodedFileName.length-4);
        songList.innerHTML=songList.innerHTML+`<li>
        <div>
        <div class="capsule">
        <img class="disc " src="disc.svg" alt="vynil-02" width="30"/>
                <div class="title">
                  <div class="songName h-1">${decodedFileName}</div>
                  <div class="artist h-2 bold">Unknown</div>
                </div>
        </div>
                <div class="playNow"><div class=" h-1">Play Now</div>
                <img class="playNowicon" src="playNow.svg" alt="">
                </div>
        </div>
        </li>`;
    }
    
    // Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(element => {
    //     element.addEventListener("click",(evt)=>{
    //         playMusic(element.querySelector(".title").firstElementChild.innerHTML);
    //         document.querySelector(".CurrentsongName").innerHTML=element.querySelector(".title").firstElementChild.innerHTML;
    //         console.log(element.querySelector(".title").firstElementChild.innerHTML);
    //     })
    // });
    document.querySelector(".songsList").addEventListener("click",(evt)=>{
        let clicked = evt.target;
        let parentitem = clicked.closest(".title").firstElementChild.innerHTML;
        playMusic(parentitem);
    })
    let playpausebutton = document.querySelector(".play");
    let pause = true;
    playpausebutton.addEventListener("click",()=>{
        if (pause) {
            currentTrack.play(); 
            setInterval(() => {
                console.log(audio.duration);
            console.log(Math.ceil(audio.currentTime));
            }, 1000);
        pause = false;
        }
        else{
            currentTrack.pause();
            pause = true;
        }
    })
}
parsedSongs();