import { React, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getFormattedWeatherData from "../services/weatherService";

function Carousel(props) {
  const windData = props.data;

  return (
    <div className="flex flex-row p-2 h-24 w-24 ">
      {windData?.map((item) => (
        <div key={item.id} className="p-2">
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default Carousel;
