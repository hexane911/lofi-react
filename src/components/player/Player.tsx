import { useEffect, useRef, useState } from "react";
// import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import styles from "./styles.module.scss";
import { normalizetime } from "../../hooks";

import { PlayButton } from "./play-button";
import { useSelector } from "react-redux";
import { getUUID } from "../../redux/uuidSlice";
import { useGetPointsQuery, useNowPlayingQuery } from "../../redux/songsApi";
import PlayerBg from "./playerBg/PlayerBg";

const Player = () => {
  const audioRef = useRef();
  const [isPlaying, setPlaying] = useState(false);
  const [listeningTime, setListeningTime] = useState(0);
  const uuid = useSelector(getUUID);

  const toggle = () => setPlaying((s) => !s);


  useEffect(() => {
    if (audioRef.current && uuid) {
      console.log("a");
      if (isPlaying) {
        //@ts-ignore
        audioRef.current.play();
      } else {
        //@ts-ignore
        audioRef.current.pause();
      }
    }
  }, [audioRef, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setListeningTime((t) => t + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  const { data: nowPlaying } = useNowPlayingQuery(undefined as void, {
    pollingInterval: 5000,
  });
  const { data: points, refetch: refetchPoints } = useGetPointsQuery(uuid, {
    pollingInterval: 5000,
    skip: !uuid,
  });

  useEffect(() => {
    refetchPoints();
  }, [uuid, isPlaying]);

  return (
    <section className={styles.container}>
      <PlayerBg />
      <div className={styles.nav}>
        {!!uuid && <div className={styles.navTitle}>{points || 0} points</div>}
      </div>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <div>
            <h3>{nowPlaying?.title || "Loading..."}</h3>
            <span>{nowPlaying?.artist || " "}</span>
          </div>
        </div>
        <div className={styles.controls}>
          {/* <button className={clsx(styles.button, styles.skipper)} onClick={decrementTime}> */}
          {/* <SkipLeft /> */}
          {/* </button> */}
          <PlayButton
            className={styles.play}
            onClick={toggle}
            playing={isPlaying}
          />
          {/* <button className={clsx(styles.button, styles.skipper)} onClick={incrementTime}> */}
          {/* <SkipRight /> */}
          {/* </button> */}
          <div>You are listening for {normalizetime(listeningTime)}</div>
        </div>
        <div className={styles.relative}>
          {/* {currentTime && <p className={styles.timer}>{currentTime}</p>} */}
          {/* <RangeSlider myValue={percent} handler={handleSetAudio} /> */}
          {/* {totalTime && <p className={clsx(styles.timer, styles.timerLast)}>{totalTime}</p>} */}
        </div>
        <div className={styles.actions}>
          {/* <div className={styles.volume}>
              <button className={clsx(styles.button, styles.iconColor)} onClick={handleToggleVolume}>
                {volume !== 0 ? <Volume /> : <VolumeOff />}
              </button>
              <RangeSlider myValue={volume} handler={handleSetVolume} />
            </div> */}
        </div>
      </div>
      {!!uuid && (
        <audio
          //@ts-ignore
          ref={audioRef}
          style={{ zIndex: 100, position: "relative" }}
          autoPlay
        >
          <source
            src={`${import.meta.env.VITE_APP_BACKEND_URL}/stream?uuid=${uuid}`}
          ></source>
          format is not supported
        </audio>
      )}
    </section>
  );
};

export default Player;
