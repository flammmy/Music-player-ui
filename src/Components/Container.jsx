import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongs, setCurrentSong, setSelectedSongId } from '../redux/slices/songSlice';
import SongList from '../Sections/SongList';
import Header from '../Sections/Header';
import SongPlayer from '../Sections/SongPlayer';
import axios from 'axios';
import Vibrant from 'node-vibrant';
import tinycolor from 'tinycolor2';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Container = () => {
  const dispatch = useDispatch();
  const { songs, currentSong, selectedSongId } = useSelector(state => state.song);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [showSongList, setShowSongList] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        dispatch(setSongs(response.data.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setLoading(false);
      }
    };
    fetchSongs();
  }, [dispatch]);

  const updateBackgroundColor = async (coverImageUrl) => {
    try {
      const palette = await Vibrant.from(coverImageUrl).getPalette();
      const dominantColor = palette.Vibrant.hex;
      const darkenedColor = tinycolor(dominantColor).darken(30).toHexString();
      setBackgroundColor(darkenedColor);
    } catch (error) {
      console.error("Error extracting color:", error);
    }
  };

  useEffect(() => {
    if (currentSong) {
      updateBackgroundColor(`https://cms.samespace.com/assets/${currentSong.cover}`);
    }
  }, [currentSong]);

  return (
    <div 
      className="relative flex flex-col background-transition w-full h-screen md:flex-row md:h-screen"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="w-full flex flex-col md:w-[20rem]">
        <Header />
      </div>

      {/* Toggle Button for SongList */}
      <div className="flex justify-end md:hidden p-4">
        <button 
          className="text-white px-4 py-2 rounded-md"
          onClick={() => setShowSongList(!showSongList)}
        >
          {!showSongList ? <MenuIcon className='h-6 w-6'/> : <XIcon className='h-6 w-6'/>}
        </button>
      </div>

      {/* Sliding SongList */}
      <div
        className={`absolute top-0 bottom-0 w-[100%] h-full bg-transparent transition-transform duration-300 ease-in-out z-10 ${
          showSongList ? 'transform translate-x-0' : 'transform -translate-x-full'
        } md:w-[432px] md:relative md:translate-x-0 md:flex md:flex-col mt-24 md:mt-0 overflow-none`}
      >
          <SongList 
            songs={songs}
            setCurrSong={setCurrentSong}
            onSongSelect={(song) => dispatch(setCurrentSong(song))} 
            setSelectedSongId={(id) => dispatch(setSelectedSongId(id))} 
            selectedSongId={selectedSongId} 
            loading = {loading}
          />
      </div>

      {/* SongPlayer with opacity transition */}
      <div
        className={`flex-grow col-span-1 flex flex-col items-center h-screen justify-center md:relative transition-opacity duration-300 z-0 ${
          showSongList ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentSong ? (
          <SongPlayer />
        ) : (
          <p className="text-white text-2xl">Choose a song to play</p>
        )}
      </div>
    </div>
  );
};

export default Container;
