import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-btns">
      <Link to="/creator">
        <button>Start Live Streaming</button>
      </Link>
      <Link to="/audi">
        <button>Join Live Stream</button>
      </Link>
    </div>
  );
};

export default Landing;
