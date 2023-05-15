import React from 'react';
import banner from "../../assets/banner3.png"

const Header = () => {
  return (
    <div className="flex items-center justify-center mb-10 mx-60">
      <img src={banner} className="max-h-128" alt="Banner" />
    </div>
  );
};

export default Header;
