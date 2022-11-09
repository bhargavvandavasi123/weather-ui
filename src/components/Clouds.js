import cloud1 from "../img/cloud1.png";
import cloud2 from "../img/cloud2.png";
import cloud3 from "../img/cloud3.png";
import cloud4 from "../img/cloud4.png";
import cloud5 from "../img/cloud5.png";
import getFormattedWeatherData from "../services/weatherService";

import React from "react";
import { useQueries } from "@tanstack/react-query";

function Clouds() {
  return (
    <div className=" absolute -z-50 bottom-0 h-0">
      <img
        src={cloud1}
        className=" animate-cloud absolute bottom-0"
        style={{ "--i": 3 }}
      />
      <img
        src={cloud2}
        className=" animate-cloud absolute bottom-0"
        style={{ "--i": 4 }}
      />
      <img
        src={cloud3}
        className=" animate-cloud absolute bottom-0"
        style={{ "--i": 5 }}
      />
      <img
        src={cloud4}
        className="animate-cloud absolute bottom-0"
        style={{ "--i": 6 }}
      />
      <img
        src={cloud4}
        className="animate-cloud absolute bottom-0"
        style={{ "--i": 7 }}
      />
      <img src={cloud5} className="animate-cloud " style={{ "--i": 8 }} />
    </div>
  );
}

export default Clouds;
