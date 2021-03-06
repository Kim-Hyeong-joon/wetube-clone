const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
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
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  muteBtnIcon.classList =
    value === "0" ? "fas fa-volume-mute" : "fas fa-volume-up";
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

const handleFullscreen = (event) => {
  //FullScreen Button을 누른 경우
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    //fullscreen일 때 button을 누른 경우
    document.exitFullscreen();
  } else {
    // fullscreen이 아닐 때 button을 누른 경우
    videoContainer.requestFullscreen();
  }
};

const handleFullScreenChange = () => {
  //FullScreen의 상태가 변한 경우
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    // Fullscreen으로 변한 경우
    fullScreenIcon.classList = "fas fa-compress"; // 전체화면 종료 Icon 표시
  } else {
    // Fullscreen이 해제된 경우
    fullScreenIcon.classList = "fas fa-expand";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = (event) => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = (event) => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKeyDown = (event) => {
  const { code } = event;
  if (code === "Space") {
    handlePlayClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("fullscreenchange", handleFullScreenChange); // esc 눌렀을 때
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
window.addEventListener("keydown", handleKeyDown);
