import React from "react";
import Header from "../../componenti/Header.jsx";
import "./Home.css";
export default function Home() {
  return (
    <>
      <Header />
      <div className="top-headlines">
        <div className="titles"></div>
        <div className="articles"></div>
      </div>
      <div className="ad-space"></div>
    </>
  );
}
