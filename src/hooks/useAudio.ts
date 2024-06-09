import { useEffect, useMemo, useState } from 'react';

interface Params {
  sound?: string | any;
  onEnd?: () => any;
}

const useAudio = ({ sound, onEnd }: Params = {}) => {
  const audio = useMemo(() => new Audio(sound), [sound]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(audio.currentTime);
  const [percent, setPercent] = useState(0);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  const toggle = () => setPlaying(!playing);

  const play = (volume: number = 100, speed: number = 1) => {
    if (playing) {
      audio.currentTime = 0;
      audio.play();
    } else {
      setVolume(volume);
      setSpeed(speed);
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (playing) {
      handleSetVolume(volume);
      handleSetSpeed(speed);
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Math.round(audio.currentTime)), 1000);
    audio.addEventListener('ended', () => {
      setPlaying(false);
      onEnd && onEnd();
    });
    return () => {
      audio.src = '';
      clearInterval(interval);
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  useEffect(() => {
    if (audio.duration) {
      setPercent((currentTime / audio.duration) * 100);
    }
  }, [currentTime]);

  function normalizeTime(time: number) {
    let min: number | string = Math.floor(time / 60);
    if (min < 10) {
      min = '0' + String(min);
    }
    let sec: number | string = Math.floor(time % 60);
    if (sec < 10) {
      sec = '0' + String(sec);
    }

    return min + ':' + sec;
  }

  function incrementTime() {
    audio.currentTime += 15;
    setCurrentTime(audio.currentTime);
  }

  function decrementTime() {
    audio.currentTime -= 15;
    setCurrentTime(audio.currentTime);
  }

  function handleSetVolume(number: any) {
    audio.volume = number / 100;
    setVolume(number);
  }

  function handleSetSpeed(number: number) {
    audio.playbackRate = number;
    setSpeed(number);
  }

  function handleToggleVolume() {
    if (volume === 0) {
      audio.volume = 1;
      return setVolume(audio.volume * 100);
    }
    audio.volume = 0;
    return setVolume(audio.volume);
  }

  function handleSetAudio(number: number) {
    const per = number / 100;
    audio.currentTime = audio.duration * per;

    setPercent(per);
  }

  audio.onloadedmetadata = () => {
    setDuration(audio.duration);
  };

  return {
    playing,
    toggle,
    play,
    currentTime: normalizeTime(currentTime),
    totalTime: normalizeTime(duration),
    percent,
    volume,
    decrementTime,
    incrementTime,
    setVolume,
    handleSetVolume,
    setPercent,
    handleToggleVolume,
    handleSetAudio,
  };
};

export default useAudio;
