(() => {
  const frames = [...document.querySelectorAll('.js-youtube-player')];
  if (!frames.length) return;

  const players = [];
  const initialisePlayers = () => {
    frames.forEach(frame => {
      const shell = frame.closest('.media-embed-shell, .reel-card-screen');
      const player = new YT.Player(frame, {
        events: {
          onReady(event) {
            event.target.setVolume(100);
          },
          onStateChange(event) {
            if (event.data !== YT.PlayerState.PLAYING) return;
            event.target.unMute();
            event.target.setVolume(100);
            if (shell) {
              shell.dataset.playerState = 'playing';
              window.setTimeout(() => {
                shell.dataset.playerMuted = String(event.target.isMuted());
                shell.dataset.playerVolume = String(event.target.getVolume());
              }, 250);
            }
            players.forEach(other => {
              if (other !== event.target && other.getPlayerState() === YT.PlayerState.PLAYING) other.pauseVideo();
            });
          }
        }
      });
      players.push(player);
    });
  };

  if (window.YT?.Player) initialisePlayers();
  else {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') previousReady();
      initialisePlayers();
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  }
})();
