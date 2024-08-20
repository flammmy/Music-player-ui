import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="loader animate-spin rounded-full border-4 border-t-transparent border-white w-12 h-12"></div>
      <span className="ml-3 text-white text-lg"></span>
    </div>
  );
}

export default Loader;
