import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Categories />
    </div>
  );
}

export default Home;