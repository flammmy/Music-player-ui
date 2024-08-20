import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSong,
  togglePlayPause,
  toggleMute,
  setProgress,
  setCurrentIndex,
  setSelectedSongId,
  setIsPlaying,
  setCover,
} from "../redux/slices/songSlice";
import Play from "../Assets/play.png";
import Next from "../Assets/next.png";
import Back from "../Assets/back.png";
import Menu from "../Assets/menu.png";
import Mute from "../Assets/mute.png";
import Pause from "../Assets/pause.png";
import Unmute from "../Assets/unmute.png";
import Placeholder from "../Assets/placeholder.png";

const SongPlayer = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [imageLoading, setImageLoading] = useState(true);

  const dispatch = useDispatch();
  const {
    currentSong,
    isPlaying,
    isMuted,
    currentIndex,
    songs,
    progress,
    cover,
  } = useSelector((state) => state.song);

  useEffect(() => {
    const audio = audioRef.current;
    dispatch(setIsPlaying(true));
    const updateProgress = () => {
      const currentTime = audio.currentTime;
      const progressPercentage = (currentTime / audio.duration) * 100;
      dispatch(setProgress(progressPercentage));
    };
    setImageLoading(true)
    const playAudioAutomatically = () => {
      audio.play();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("canplaythrough", playAudioAutomatically);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("canplaythrough", playAudioAutomatically);
    };
  }, [dispatch, currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);


  useEffect(() => {
    const img = new Image();
    img.src = `https://cms.samespace.com/assets/${currentSong.cover}`;
    img.onload = () => {
      dispatch(setCover(img.src)); 
      setImageLoading(false);
    };
  }, [currentSong, dispatch]);
  

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const handleNext = () => {
    const newIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    dispatch(setCurrentIndex(newIndex));
    dispatch(setSelectedSongId(songs[newIndex].id));
    dispatch(setCurrentSong(songs[newIndex]));
    audioRef.current.load();
  };

  const handleBack = () => {
    const newIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    dispatch(setCurrentIndex(newIndex));
    dispatch(setSelectedSongId(songs[newIndex].id));
    dispatch(setCurrentSong(songs[newIndex]));
    audioRef.current.load();
  };

  const togglePlayPauseHandler = () => {
    dispatch(togglePlayPause());
  };

  const toggleMuteHandler = () => {
    dispatch(toggleMute());
  };


  const handleSeek = (e) => {
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime =
      (clickX / progressBar.clientWidth) * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="flex flex-col place-items-start justify-center mb-6 md:mb-0">
      <h3 className="text-xl font-semibold text-white mb-1">
        {currentSong.name}
      </h3>
      <p className="text-sm text-gray-400 mb-6">{currentSong.artist}</p>

      {!imageLoading ? (
        <img
          src={cover}
          alt={`${currentSong.title} album cover`}
          className="rounded-md w-[19rem] mb-9 aspect-square md:w-[22rem]"
        />
      ) : (
        <img
          src={Placeholder}
          alt={`${currentSong.title} album cover`}
          className="rounded-md w-[19rem] mb-9 aspect-square md:w-[22rem]"
        />
      )}

      <div
        className="w-[19rem] mt-2 h-1 bg-gray-600 relative cursor-pointer rounded-full mb-3 md:w-[22rem]"
        onClick={handleSeek}
      >
        <div
          ref={progressBarRef}
          className="h-1 bg-white rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-row justify-between w-[19rem] md:w-[22rem] mt-4 cursor-pointer">
        <img src={Menu} alt="Menu" className="w-7 h-7 md:w-10 md:h-10" />
        <div className="flex flex-row w-[180px] justify-evenly">
          <img
            src={Back}
            alt="Back"
            onClick={handleBack}
            className="w-7 h-7 md:w-10 md:h-10"
          />
          <button onClick={togglePlayPauseHandler}>
            {isPlaying ? (
              <img
                src={Pause}
                alt="Play/Pause"
                className="w-7 h-7 md:w-10 md:h-10"
              />
            ) : (
              <img
                src={Play}
                alt="Play/Pause"
                className="w-7 h-7 md:w-10 md:h-10"
              />
            )}
          </button>
          <img
            src={Next}
            alt="Next"
            onClick={handleNext}
            className="w-7 h-7 md:w-10 md:h-10"
          />
        </div>
        <button onClick={toggleMuteHandler}>
          {isMuted ? (
            <img
              src={Unmute}
              alt="Mute/Unmute"
              className="w-7 h-7 md:w-10 md:h-10"
            />
          ) : (
            <img
              src={Mute}
              alt="Mute/Unmute"
              className="w-7 h-7 md:w-10 md:h-10"
            />
          )}
        </button>
      </div>

      <audio ref={audioRef} src={currentSong.url} />
    </div>
  );
};

export default SongPlayer;
