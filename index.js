// --------------------
// Taskbar Clock
function updateClock() {
  const timeElement = document.getElementById('time');
  const now = new Date();
  timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 1000);

// --------------------
// Music player elements
const musicPlayer = document.getElementById('musicPlayer');
const playerHeader = document.getElementById('playerHeader');
const audioPlayer = document.getElementById('audioPlayer');
const songTitle = document.getElementById('songTitle');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const closeBtn = document.getElementById('closePlayer');
const progress = document.getElementById('progress');
const albumArt = document.getElementById('albumArt');

// Example playlist 
const playlist = [
  {file:'ik ben het maar.mp3', art:'https://i.scdn.co/image/ab67616d0000b273b116ea79716f8a6cdd39404b'},
  {file:'Love You Anymore.mp3', art:'https://i.scdn.co/image/ab67616d0000b2735f70e605cc07b6cbb16ec20c'},
  {file:'Gorgeous.mp3', art:'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f'},
    {file:'simswarm.mp3', art:'https://i.scdn.co/image/ab67616d0000b2739ec66d199c19d227f5c37a68'}
];
let currentIndex = 0;

// --------------------
// About Me elements
const aboutMe = document.getElementById('aboutMe');
const aboutHeader = document.getElementById('aboutHeader');
const closeAbout = document.getElementById('closeAbout');

// --------------------
// Open windows on double-click
document.querySelector('.icon:nth-child(2)').addEventListener('dblclick', () => {
  musicPlayer.style.display = 'block';
  loadSong(currentIndex);
});

document.querySelector('.icon:nth-child(1)').addEventListener('dblclick', () => {
  aboutMe.style.display = 'block';
});

// --------------------
// Close buttons
closeBtn.addEventListener('click', () => {
  musicPlayer.style.display = 'none';
  audioPlayer.pause();
  playBtn.innerHTML = '<i class="fa fa-play"></i>'; // paused
});

closeAbout.addEventListener('click', () => {
  aboutMe.style.display = 'none';
});

// --------------------
// Load song (starts paused)
function loadSong(index){
  audioPlayer.src = playlist[index].file;
  songTitle.textContent = playlist[index].file.replace('.mp3','');
  albumArt.src = playlist[index].art;
  audioPlayer.pause(); // start paused
  playBtn.innerHTML = '<i class="fa fa-play"></i>'; // show play icon
}

// --------------------
// Play/Pause toggle
playBtn.addEventListener('click', () => {
  if(audioPlayer.paused){
    audioPlayer.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
});

// --------------------
// Next / Previous buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
});

// --------------------
// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
  if(audioPlayer.duration){
    progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  }
});

// --------------------
// Seek functionality
progress.addEventListener('input', () => {
  audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

// --------------------
// Drag functionality for Music Player & About Me
function makeDraggable(header, container){
  let offsetX = 0, offsetY = 0, isDragging = false;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;
    header.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if(isDragging){
      container.style.left = (e.clientX - offsetX) + 'px';
      container.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    header.style.cursor = 'grab';
  });
}

makeDraggable(playerHeader, musicPlayer);
makeDraggable(aboutHeader, aboutMe);

// --------------------
// Desktop icons draggable
const icons = document.querySelectorAll('.icon');
const startX = 20;
let startY = 20;   
const spacing = 100;

icons.forEach((icon, index) => {
  icon.style.left = startX + 'px';
  icon.style.top = startY + index * spacing + 'px';

  icon.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', null);
    icon.classList.add('dragging');
  });

  icon.addEventListener('dragend', (e) => {
    icon.classList.remove('dragging');
    const rect = icon.parentElement.getBoundingClientRect();
    let x = e.clientX - rect.left - icon.offsetWidth / 2;
    let y = e.clientY - rect.top - icon.offsetHeight / 2;
    icon.style.left = x + 'px';
    icon.style.top = y + 'px';
  });
});

