const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  // mute면, volumeRange 0, unmute시 기존 volumeValue로 복귀, 근데 기존 volumeValue가 0이면, 0.5로 바꾸기.
  if (video.muted) {
    volumeRange.value = 0;
  } else {
    volumeRange.value = volumeValue;
    if (volumeValue === "0") {
      volumeValue = 0.5;
      video.volume = volumeValue;
      volumeRange.value = volumeValue;
    }
  }
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  muteBtn.innerText = value === "0" ? "Unmute" : "Mute";
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) => {
  const totalSeconds = video.duration;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  if (totalMinutes < 10) {
    return new Date(seconds * 1000).toISOString().substr(15, 4);
  }
  if (totalHours < 1) {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
  }
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const handleLoadedMetadata = (event) => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = (e) => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
