import React from "react";

import HomeImage from "./home-money.jpg";

import "./style.css";

function Home() {
  return (
    <div className="home-section">
      <div className="home-left-section">
        <a href="https://www.freepik.com" target="_blank" rel="noreferrer">
          <img src={HomeImage} alt="" width={"500px"}></img>
        </a>
      </div>
      <div className="home-right-section">
        <p className="home-title">
          you<span>R</span>
        </p>
        <p className="home-title">
          e<span>X</span>change
        </p>
        <p className="home-title">
          <span>R</span>ates
        </p>
        <p className="home-description">
          Let us show you how much your <span>PLN</span> is worth on the market!
          You will be shocked..
        </p>
      </div>
    </div>
  );
}

export default Home;
