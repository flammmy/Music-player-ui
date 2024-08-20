import React from 'react';
import spotifyLogo from '../Assets/Logo.png'; 
import userIcon from '../Assets/UserIcon.png'; 

const Header = () => {
  return (
    <div className="header-container flex flex-row h-12 w-[100%] justify-between items-center	md:flex-col md:h-screen md:items-start">
      
      <img src={spotifyLogo} alt="Spotify Logo" className="w-24 mt-8 ml-8 md:w-32" />

      <img src={userIcon} alt="User Icon" className="h-10 w-10 object-cover mt-4 mr-4 md:mb-4 md:ml-4" />
    </div>
  );
};

export default Header;
