import React, { useState, useMemo } from "react";
import SongItem from "../Components/SongItem";
import Search from "../Assets/search.png";
import { setCurrentIndex } from "../redux/slices/songSlice";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader.jsx";

const SongList = ({ songs, onSongSelect, selectedSongId, loading }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("forYou");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSongClick = (song, index) => {
    onSongSelect(song);
    dispatch(setCurrentIndex(index));
  };

  const filteredSongs = useMemo(() => {
    return songs
      .filter((song) => (activeTab === "topTracks" ? song.top_track : true))
      .filter(
        (song) =>
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [songs, activeTab, searchQuery]);

  return (
    <div className="mt-[40px] pl-7 pr-7">
      <div className="flex space-x-7">
        <button
          className={`text-xl font-bold md:text-2xl ${
            activeTab === "forYou" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={`text-xl font-bold md:text-2xl ${
            activeTab === "topTracks" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("topTracks")}
        >
          Top Tracks
        </button>
      </div>

      <div className="relative mt-4 h-10 bg-[rgba(255,255,255,0.2)] rounded-lg flex justify-between place-items-center md:h-10">
        <input
          type="text"
          placeholder="Search Song, Artist"
          className="w-full p-2 pl-4 bg-transparent text-white focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src={Search} alt="" className="h-5 w-5 mr-4" />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-grow overflow-hidden">
          <div className="space-y-4 mt-4 max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-170px)] overflow-scroll">
            {filteredSongs.map((song, index) => (
              <SongItem
                key={song.id}
                id={song.id}
                index={index}
                cover={`https://cms.samespace.com/assets/${song.cover}`}
                title={song.name}
                artist={song.artist}
                url={song.url}
                onClick={() => handleSongClick(song, index)}
                isSelected={song.id === selectedSongId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;
