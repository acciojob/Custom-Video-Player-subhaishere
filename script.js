// Get references to the necessary DOM elements
const video = document.querySelector('.player__video');
const playButton = document.querySelector('.player__button.toggle');
const volumeSlider = document.querySelector('.player__slider[name="volume"]');
const playbackSpeedSlider = document.querySelector('.player__slider[name="playbackRate"]');
const skipButtons = document.querySelectorAll('.player__button[data-skip]');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play button icon
function updatePlayButtonIcon() {
  playButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Function to handle skipping the video
function skipVideo() {
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

// Function to handle volume control
function handleVolumeChange() {
  video.volume = this.value;
}

// Function to handle playback speed control
function handlePlaybackRateChange() {
  video.playbackRate = this.value;
}

// Function to update the progress bar
function updateProgressBar() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

// Function to handle scrubbing the video
function scrubVideo(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Add event listeners for the player controls
video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButtonIcon);
video.addEventListener('pause', updatePlayButtonIcon);
video.addEventListener('timeupdate', updateProgressBar);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handlePlaybackRateChange);
skipButtons.forEach(button => button.addEventListener('click', skipVideo));
progress.addEventListener('click', scrubVideo);

// Hide the default controls of the video element
video.controls = false;
