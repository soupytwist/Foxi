"use strict";

import {nowplaying as template} from './templates';
import Episode from './Episode';
import {addTouchListener, app} from './utils';
import DetailCard from './DetailCard';
import Playlist from './Playlist';
import PlaylistCard from './PlaylistCard';

var _player = {};
var progressInterval = null;

var player = {
  initialize(kodi) {
    // Get the active player id, if there is one
    kodi.Player_GetActivePlayers().then(activePlayers => {

      if (activePlayers.result.length > 0) {
        _player.id = activePlayers.result[0].playerid;
        player.refreshItem(kodi);

      } else {
        player.item = null;
      }
    });

    // Event: playback starts
    kodi.subscribe('Player.OnPlay', onplay => {
      let data = onplay.data;
      if ('speed' in data.player) {
        player.speed = data.player.speed;
      }

      // XXX This value cannot be trusted
      //_player.id = data.player.playerid;

      // Workaround- query for the active player
      kodi.Player_GetActivePlayers().then(activePlayers => {
        if (activePlayers.result.length > 0) {
          _player.id = activePlayers.result[0].playerid;
          player.refreshItem(kodi);

        } else {
          player.item = null;
        }
      });
    });

    // Event: playback paused
    kodi.subscribe('Player.OnPause', () => {
      player.speed = 0;
    });

    // Event: playback stops
    kodi.subscribe('Player.OnStop', () => {
      player.speed = 0;
      player.item = null;
    });

    // Event: playback stops
    kodi.subscribe('Player.OnSeek', onseek => {
      player.time  = onseek.data.player.time;
    });

    // Event: speed changed
    kodi.subscribe('Player.OnSpeedChanged', onspeed => {
      player.speed = onspeed.data.player.speed;
    });

    // Event: property changed
    kodi.subscribe('Player.OnPropertyChanged', onprop => {
      if ('shuffled' in onprop.data.property) {
        player.shuffle = onprop.data.property.shuffled;
      }
    });

    // Event: volume changed
    kodi.subscribe('Application.OnVolumeChanged', onvol => {
      player.volume = onvol.data.volume;
      player.muted = onvol.data.muted;
    });

    // Seek bar
    var seekBar = document.getElementById('control-seek-bar');
    var seekHandler = document.getElementById('control-seek-handler');
    var seekTo = -1;

    seekHandler.addEventListener('touchstart', () => {
      _player.isSeeking = true;
      window.addEventListener('touchmove', onSeekBarMoved);
      window.addEventListener('touchend', endSeeking);
    });

    function onSeekBarMoved(evt) {
      if (_player.isSeeking) {
        var rect = seekBar.getClientRects()[0];
        seekTo = Math.max(0,Math.min(1,
          (evt.touches[0].screenX - rect.x) / rect.width
        )) * 100;
        seekHandler.style.left = seekTo + "%";
      }
    }
    function endSeeking()  {
      _player.isSeeking = false;
      window.removeEventListener('touchmove', onSeekBarMoved);
      window.removeEventListener('touchend', endSeeking);
      if (seekTo !== -1) {
        kodi.Player_Seek({
          playerid: _player.id,
          value: seekTo
        });
      }
      seekTo = -1;
    }

    // Button: play/pause playback
    var btn_playpause = document.getElementById('control-playpause');
    btn_playpause.addEventListener('click', () => {
      kodi.Player_PlayPause({ playerid: _player.id });
    });
    
    // Button: stop playback
    var btn_stop = document.getElementById('control-stop');
    btn_stop.addEventListener('click', () => {
      player.expanded = false;
      kodi.Player_Stop({ playerid: _player.id });
    });

    // Button: seek forward
    var btn_seekfwd = document.getElementById('control-seek-forward');
    btn_seekfwd.addEventListener('click', () => {
      var seektype = 'smallforward';
      var now = new Date().getTime();
      if (_player.lastSeekFwd && (now - _player.lastSeekFwd) < 500) {
        seektype = 'bigforward';
      }
      _player.lastSeekFwd = now;

      kodi.Player_Seek({
        playerid: _player.id,
        value: seektype
      });
    });

    // Button: seek backward
    var btn_seekback = document.getElementById('control-seek-back');
    btn_seekback.addEventListener('click', () => {
      var seektype = 'smallbackward';
      var now = new Date().getTime();
      if (_player.lastSeekBack && (now - _player.lastSeekBack) < 500) {
        seektype = 'bigbackward';
      }
      _player.lastSeekBack = now;

      kodi.Player_Seek({
        playerid: _player.id,
        value: seektype
      });
    });

    // Button: skip forard
    var btn_skipfwd = document.getElementById('control-skip-forward');
    btn_skipfwd.addEventListener('click', () => {
      kodi.Player_GoTo({
        playerid: _player.id,
        to: 'next'
      });
    });

    // Button: skip forard
    var btn_skipback = document.getElementById('control-skip-back');
    btn_skipback.addEventListener('click', () => {
      kodi.Player_GoTo({
        playerid: _player.id,
        to: 'previous'
      });
    });

    // Button: toggle shuffle
    var btn_shuffle = document.getElementById('control-shuffle');
    btn_shuffle.addEventListener('click', () => {
      var newVal = !player.shuffle;
      kodi.Player_SetShuffle({
        playerid: _player.id,
        shuffle: newVal
      }).then(() => {
        player.shuffle = newVal;
      });
    });

    // Button: toggle mode
    var btn_mode = document.getElementById('control-mode');
    btn_mode.addEventListener('click', () => {
      player.mode = (player.mode === 'classic' ? 'normal' : 'classic');
    });

    // Button: show playlist
    var btn_playlist = document.getElementById('control-playlist');
    btn_playlist.addEventListener('click', () => {

      // Check if there is already a playlist card
      var found = app.stack.rewindUntil(card => card.model instanceof Playlist);

      if (!found) {
        var playlistCard = new PlaylistCard(new Playlist({playlistid: 0}));
        playlistCard.prepare().then(() => {
          app.stack.push(playlistCard);
          player.expanded = false;

          // TODO move this out of the player-- player shouldn't
          // know about UI state that doesn't directly concern it
          player.updatePlaylistItem();
        });
      }
    });

    // Link to nowplaying media
    var nowplayingElm = document.getElementById('control-nowplaying-content');
    nowplayingElm.addEventListener('click', () => {
      var itemCard = new DetailCard(player.item);
      itemCard.isDialog = true;
      itemCard.prepare().then(() => {
        app.stack.push(itemCard);
        player.expanded = false;
        player.show = false;
      });
    });

    // Handle: expand/collapse
    var btn_handle = document.getElementById('control-handle');
    addTouchListener([btn_handle], {
      onTouched: () => {
        if (player.expanded) {
          player.expanded = false;
        } else if (!player.show) {
          player.show = true;
          player.expanded = false;
        } else {
          player.expanded = true;
        }

      },
      onSwipeUp: () => {
        player.show = true;
        player.expanded = true;
      },
      onSwipeDown: () => {
        player.expanded = false;
        player.show = false;
      },
      yDistance: 8
    });

    // Buttons: classic remote buttons
    var btn_up     = document.getElementById('control-up'),
        btn_left   = document.getElementById('control-left'),
        btn_right  = document.getElementById('control-right'),
        btn_down   = document.getElementById('control-down'),
        btn_select = document.getElementById('control-select'),
        btn_home   = document.getElementById('control-home'),
        btn_info   = document.getElementById('control-info'),
        btn_back   = document.getElementById('control-back'),
        btn_menu   = document.getElementById('control-context-menu');

    btn_up.addEventListener('click', kodi.Input_Up.bind(kodi, {}));
    btn_left.addEventListener('click', kodi.Input_Left.bind(kodi, {}));
    btn_right.addEventListener('click', kodi.Input_Right.bind(kodi, {}));
    btn_down.addEventListener('click', kodi.Input_Down.bind(kodi, {}));
    btn_select.addEventListener('click', kodi.Input_Select.bind(kodi, {}));

    btn_home.addEventListener('click', kodi.Input_Home.bind(kodi, {}));
    btn_info.addEventListener('click', kodi.Input_Info.bind(kodi, {}));
    btn_back.addEventListener('click', kodi.Input_Back.bind(kodi, {}));
    btn_menu.addEventListener('click', kodi.Input_ContextMenu.bind(kodi, {}));

    // Volume control
    var btn_volup    = document.getElementById('control-volume-up'),
        btn_voldown  = document.getElementById('control-volume-down'),
        btn_volmute  = document.getElementById('control-volume-mute'),
        btn_volclose = document.getElementById('control-volume-close'),
        btn_volume   = document.getElementById('btn-volume');

    btn_volup.addEventListener('click', () => {
      kodi.Application_SetVolume({ volume: 'increment' });
    });
    btn_voldown.addEventListener('click', () => {
      kodi.Application_SetVolume({ volume: 'decrement' });
    });
    btn_volmute.addEventListener('click', () => {
      kodi.Application_SetMute({ mute: 'toggle' });
    });
    btn_volclose.addEventListener('click', () => player.show_volume = false);
    btn_volume.addEventListener('click', () => player.show_volume = true);

    // Get the initial volume status
    kodi.Application_GetProperties({
      properties: [ 'volume', 'muted' ]
    }).then(props => {
      player.volume = props.result.volume;
      player.muted = props.result.muted;
    });
  },

  get volume() {
    return _player.volume;
  },

  set volume(val) {
    var volumeLabel = document.getElementById('control-volume-label');
    _player.volume = parseInt(val);
    volumeLabel.innerHTML = _player.volume;

    var volumeGuage = document.getElementById('volume-guage');
    volumeGuage.setAttribute('d', describeGuage(15, _player.volume / 100));

    var volumeGuageText = document.getElementById('volume-guage-text');
    volumeGuageText.textContent = _player.volume;
  },

  get muted() {
    return _player.muted;
  },

  set muted(val) {
    var appElm = document.getElementById('app');
    _player.muted = val;
    if (val && !appElm.classList.contains('muted')) {
      appElm.classList.add('muted');
    } else if (!val && appElm.classList.contains('muted')) {
      appElm.classList.remove('muted');
    }
  },

  get show_volume() {
    return _player.showVolume;
  },

  set show_volume(val) {
    var overlay = document.getElementById('volume');
    if (val && overlay.classList.contains('hide')) {
      overlay.classList.remove('hide');
    } else if (!val && !overlay.classList.contains('hide')) {
      overlay.classList.add('hide');
    }
  },

  get expanded() {
    var controls = document.getElementById('controls');
    return controls.classList.contains('expanded');
  },

  set expanded(val) {
    var controls = document.getElementById('controls');
    var btn_handle = document.getElementById('control-handle');

    if (val) {
      controls.classList.add('expanded');
      btn_handle.setAttribute('data-icon', 'dismiss-keyboard');
    } else {
      controls.classList.remove('expanded');
      btn_handle.setAttribute('data-icon', 'dialpad');
    }
  },

  get mode() {
    return _player.mode || 'normal';
  },

  set mode(val) {
    var controls = document.getElementById('controls');
    var btn_mode = document.getElementById('control-mode');

    _player.mode = val;

    if (val === 'classic') {
      controls.classList.add('classic');
      btn_mode.setAttribute('data-icon', 'keyboard-circle');
    } else {
      controls.classList.remove('classic');
      btn_mode.setAttribute('data-icon', 'keyboard');
    }
  },

  refreshItem(kodi) {
    //var controls = document.getElementById('controls');
    //controls.classList.remove('nowplaying');

    Promise.all([
      //new Promise(r => window.setTimeout(r, 250)),
      kodi.Player_GetItem({
        playerid: _player.id,
        properties: [
          'title', 'season', 'episode', 'thumbnail', 'showtitle', 'art'
        ]
      })]).then(data => {
        let item = data[0].result.item;
        switch (item.type) {
          case 'episode': 
            player.item = new Episode(item);
            break;
        }
      });

    // Query for current position, etc
    kodi.Player_GetProperties({
      playerid: _player.id,
      properties: [
        'speed', 'time', 'totaltime', 'shuffled'
      ]
    }).then(properties => {
      if (!properties.error) {
        player.speed = properties.result.speed;
        player.time = properties.result.time;
        player.totaltime = properties.result.totaltime;
        player.shuffle = properties.result.shuffled;
      }
    });
  },

  get item() {
    return _player.item;
  },

  set item(item) {
    var controls = document.getElementById('controls');
    var nowplaying = document.getElementById('control-nowplaying-content');
    _player.item = item;

    if (item instanceof Episode) {
      nowplaying.innerHTML = template.episode(item);
      controls.classList.add('nowplaying');
    } else {
      controls.classList.remove('nowplaying');
      player.time = 0;
    }

    player.updatePlaylistItem();
  },

  updatePlaylistItem() {
    var playlist = document.getElementById('playlist');
    if (playlist) {
      var current = player.item ? String(player.item.id) : null;
      var items = playlist.getElementsByTagName('li');
      Array.prototype.forEach.call(items, item => {
        var itemId = item.getAttribute('data-id');
        var match = current !== null && itemId === current;

        if (match && !item.classList.contains('current')) {
          item.classList.add('current');

        } else if (!match && item.classList.contains('current')) {
          item.classList.remove('current');
        }
      });
    }
  },

  get speed() {
    return _player.speed;
  },

  set speed(val) {
    _player.speed = val;
    var btn_playpause = document.getElementById('control-playpause');
    btn_playpause.setAttribute('data-icon', val === 0 ? 'play' : 'pause');

    var progress = document.getElementById('control-progress');
    var seekProgress = document.getElementById('control-seek-progress');
    if (val === 0 && progress.classList.contains('pack-activity')) {
      progress.classList.remove('pack-activity');
      seekProgress.classList.remove('pack-activity');
    } else if (val !== 0 && !progress.classList.contains('pack-activity')) {
      progress.classList.add('pack-activity');
      seekProgress.classList.add('pack-activity');
    }

    if (progressInterval) {
      window.clearInterval(progressInterval);
    }

    if (val !== 0) {
      progressInterval = window.setInterval(() => {
        player.time += (val > 0 ? 1 : -1);
      }, Math.abs(1000 / val));
    } else {
      progressInterval = null;
    }
  },

  get time() {
    return _player.time;
  },

  set time(t) {
    if (typeof t === 'object') {
      _player.time = timeToSecs(t);
    } else {
      _player.time = t || 0;
    }
    var progress = document.getElementById('control-progress');
    progress.setAttribute('value', _player.time);

    var seekProgress = document.getElementById('control-seek-progress');
    var seekHandler = document.getElementById('control-seek-handler');
    var seekCur = document.getElementById('control-seek-cur');
    var totaltime = player.totaltime, pct = 0;
    if (totaltime > 0) {
      pct = parseInt(_player.time / totaltime * 100);
    }
    seekProgress.setAttribute('value', _player.time);
    seekCur.innerHTML = totaltime > 0 ? secsToTime(_player.time) : '&ndash;';

    if (!_player.isSeeking) {
      seekHandler.style.left = pct + '%';
    }
  },

  get totaltime() {
    return _player.totaltime;
  },

  set totaltime(t) {
    if (typeof t === 'object') {
      _player.totaltime = timeToSecs(t);
    } else {
      _player.totaltime = t || 0;
    }
    var progress = document.getElementById('control-progress');
    progress.setAttribute('max', _player.totaltime);

    var seekProgress = document.getElementById('control-seek-progress');
    var seekHandler = document.getElementById('control-seek-handler');
    var seekCur = document.getElementById('control-seek-cur');
    var seekEnd = document.getElementById('control-seek-end');
    var pct = parseInt(_player.time / _player.totaltime * 100);
    seekProgress.setAttribute('max', _player.totaltime);
    seekCur.innerHTML = _player.totaltime > 0 ? secsToTime(_player.time) : '&ndash;';
    seekEnd.innerHTML = _player.totaltime > 0 ? secsToTime(_player.totaltime) : '&ndash;';

    if (!_player.isSeeking) {
      seekHandler.style.left = pct + '%';
    }
  },

  get shuffle() {
    return _player.shuffle;
  },

  set shuffle(val) {
    _player.shuffle = val;
    var shuffleBtn = document.getElementById('control-shuffle');
    if (val && shuffleBtn.hasAttribute('x-disabled')) {
      shuffleBtn.removeAttribute('x-disabled');
    } else if (!val && !shuffleBtn.hasAttribute('x-disabled')) {
      shuffleBtn.setAttribute('x-disabled', '');
    }
  },

  get show() {
    return _player.show;
  },

  set show(val) {
    _player.show = val;
    var controls = document.getElementById('controls');
    if (val && controls.classList.contains('collapsed')) {
      controls.classList.remove('collapsed');
    } else if (!val && !controls.classList.contains('collapsed')) {
      controls.classList.add('collapsed');
    }
  }

};

function polarToCartesian(radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: 3 + radius * (1 + Math.cos(angleInRadians)),
    y: 3 + radius * (1 + Math.sin(angleInRadians))
  };
}

function describeGuage(radius, pct) {
  if (pct > 0.99) {
    pct = 0.99;
  }
  var start = polarToCartesian(15,  360 * (0.5 + pct));
  var arcSweep = pct <= 0.5 ? "0" : "1";

  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, arcSweep, 0, radius+3, 2*radius+3
  ].join(" ");
}

function timeToSecs(t) {
  return ((t.hours||0) * 3600) + ((t.minutes||0) * 60) + (t.seconds||0);
}

function secsToTime(secs) {
  var h = parseInt(secs / 3600);
  var xs = secs - h * 3600;
  var m = parseInt(xs / 60);
  var s = parseInt(xs - m * 60);

  if (h > 0) {
    return h + ":" + ('0'+m).slice(-2) + ":" + ('0'+s).slice(-2);
  } else if (m > 0) {
    return m + ":" + ('0'+s).slice(-2);
  } else {
    return "0:" + ('0'+s).slice(-2);
  }
}

export default player;
