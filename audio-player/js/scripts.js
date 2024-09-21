import { tracks } from './tracks.js';
import { getMinAndSecByDuration } from './utils.js';

class AudioController {
  constructor(tracks) {
    this.tracks = tracks;
    this.currentTrack = {};
    this.trackItemsWrapperElement = document.getElementById('track-items-wrapper');
    this.currentTrackElement = document.getElementById('current-track');
    this.timelineEndElement = document.getElementById('timeline-end');
    this.timelineStartElement = document.getElementById('timeline-start');
    this.progressLine = document.getElementById('progress-line');
    this.playButton = document.getElementById('play');
    this.prevTrackButton = document.getElementById('prev-track');
    this.nextTrackButton = document.getElementById('next-track');
    this.repeatButton = document.getElementById('repeat');
    this.muteButton = document.getElementById('mute');
    this.volumeInput = document.getElementById('volume');

    this.isPlaying = false;
    this.isRepeat = false;
    this.volume = 0.5;
  }

  init() {
    this.renderTracks();
    this.initEvents();
  }

  initEvents() {
    if (!this.trackItemsWrapperElement) {
      return;
    }

    this.trackItemsWrapperElement.addEventListener('click', this.tracksClickHandler.bind(this));
    this.prevTrackButton.addEventListener('click', this.prevTrackHandler.bind(this));
    this.nextTrackButton.addEventListener('click', this.nextTrackHandler.bind(this));
    this.repeatButton.addEventListener('click', this.repeatHandler.bind(this));
    this.volumeInput.addEventListener('input', this.volumeHandler.bind(this));
    this.muteButton.addEventListener('click', this.muteHandler.bind(this));
  }

  muteHandler() {}

  volumeHandler(event) {
    console.log('volumeHandler');
    const { audio } = this.currentTrack;
    this.volume = event.target.value;

    if (!audio) return;

    audio.volume = this.volume;
    this.changeMuteButtonIcon(this.volume);
  }

  changeMuteButtonIcon(value) {
    let modifier = '';

    if (value > 0.66) {
      modifier = '--volume-loud';
    } else if (value > 0.33) {
      modifier = '--volume-medium';
    } else if (value > 0) {
      modifier = '--volume-quiet';
    } else {
      modifier = '--mute';
    }

    this.muteButton.className = `control-button control-button${modifier}`;
  }

  renderTracks() {
    Promise.all(
      this.tracks.map((track) => {
        return new Promise((resolve) => {
          const audio = new Audio(`./assets/mp3/${track.id}.mp3`);
          audio.addEventListener('loadeddata', () => {
            track.duration = audio.duration;
            track.audio = audio;

            resolve(track);
          });
        });
      })
    ).then((tracks) => {
      tracks
        .sort((track1, track2) => track1.id - track2.id)
        .forEach((track, index) => {
          this.renderTrack(track);

          if (index === 0) {
            this.setCurrentTrack(track.id);
          }
        });
    });
  }

  repeatHandler() {
    this.isRepeat = !this.isRepeat;
    this.repeatButton.classList.toggle('active', this.isRepeat);
  }

  tracksClickHandler(event) {
    const { id } = event.target.closest('.track-item').dataset;

    if (id) {
      this.setCurrentTrack(id);
    }
  }

  renderTrack(track) {
    const trackItemStr = ` 
<div class="track-item" data-id="${track.id}">
  <div class="track-item__image" style="background-image: url(./assets/images/${track.image});"></div>
  <div class="track-item__titles">
    <div class="track-item__group">${track.group}</div>
    <div class="track-item__name">${track.name}</div>
  </div>
  <div class="track-item__duration">${getMinAndSecByDuration(track.duration)}</div>
</div>`;

    this.trackItemsWrapperElement.innerHTML += trackItemStr;
  }

  stopCurrentTrack() {
    const { audio } = this.currentTrack;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  togglePlaying() {
    const { audio } = this.currentTrack;
    if (!audio) return;
    this.isPlaying ? audio.play() : audio.pause();
  }

  setCurrentTrack(id) {
    /*  if (this.currentTrack.id === +id) {
      return;
    }
 */
    const currentTrack = this.tracks.find((track) => track.id === +id);

    if (!currentTrack) {
      return;
    }

    this.stopCurrentTrack();

    this.currentTrack = currentTrack;
    const { audio } = currentTrack;

    this.renderCurrentTrack();
    this.updatePlayHandler();
    this.setVolumeCurrentTrack(audio);

    setTimeout(this.togglePlaying.bind(this), 10);
  }

  setVolumeCurrentTrack(audio) {
    if (!audio) return;

    audio.volume = this.volume;
  }

  renderCurrentTrack() {
    if (!this.currentTrack || !this.currentTrackElement || !this.timelineStartElement || !this.timelineEndElement) {
      return;
    }

    const { name, group, duration, image } = this.currentTrack;

    const currentTrackStr = `
<div class="current-track__image" style="background-image: url(./assets/images/${image});"></div>
<div class="current-track__info">
  <div class="current-track__name">${name}</div>
  <div class="current-track__group">${group}</div>
</div>`;

    this.currentTrackElement.innerHTML = currentTrackStr;
    this.timelineStartElement.innerText = '00 : 00';
    this.timelineEndElement.innerText = getMinAndSecByDuration(duration);
    this.progressLine.style.width = `0%`;

    this.currentTrackUpdate(this.currentTrack);
  }

  currentTrackUpdate({ audio, duration }) {
    audio.addEventListener(
      'timeupdate',
      ({ target }) => {
        const { currentTime } = target;

        this.timelineStartElement.innerText = getMinAndSecByDuration(currentTime);
        this.progressLine.style.width = `${(currentTime * 100) / duration}%`;
      },
      { signal: this.removeEventListener('timeupdate') }
    );

    audio.addEventListener('ended', this.nextTrackHandler.bind(this), { signal: this.removeEventListener('ended') });
  }

  removeEventListener(listerName) {
    if (this[listerName]) {
      this[listerName].abort();
    }
    this[listerName] = new AbortController();
    return this[listerName].signal;
  }

  updatePlayHandler() {
    this.playButton.addEventListener('click', this.playTrackHandler.bind(this), {
      signal: this.removeEventListener('playTrack'),
    });
  }

  playTrackHandler() {
    console.log('this.isPlaying', this.isPlaying);
    const { audio } = this.currentTrack;

    if (this.isPlaying) {
      this.playButton.classList.remove('control-button__playing--play');
      audio.pause();
    } else {
      this.playButton.classList.add('control-button__playing--play');
      audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }

  nextTrackHandler() {
    const { id } = this.currentTrack;

    let nextId = id;

    if (!this.isRepeat) {
      const tmpId = id + 1;
      nextId = tmpId > this.tracks.length ? 1 : tmpId;
    }

    console.log('nextTrackHandler', nextId);
    this.setCurrentTrack(nextId);
  }

  prevTrackHandler() {
    const { id } = this.currentTrack;

    const tmpId = id - 1;
    const prevId = tmpId <= 0 ? this.tracks.length : tmpId;

    this.setCurrentTrack(prevId);
  }
}

const audioController = new AudioController(tracks);
audioController.init();
