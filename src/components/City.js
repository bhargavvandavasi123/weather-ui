import getFormattedWeatherData from "../services/weatherService";
import { RiCelsiusLine } from "react-icons/ri";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import Carousel from "./Carousel";
import { formatToLocalTime } from "../services/weatherService";
import { useQuery } from "@tanstack/react-query";

function City(props) {
  const fetchCities = () => {
    return getFormattedWeatherData({
      q: props.name,
      units: "metric",
    });
  };
  const { data: weather, refetch } = useQuery(
    ["city", props.name],
    fetchCities
    // {
    //   select: (data) => data.sort((a, b) => b.name - a.name),
    // }
  );
  const handleUnFavourite = (id) => {
    fetch(`http://localhost:3000/cities/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  const handleClick = () => {
    props.onDetailedView(weather?.name);
  };

  return (
    <div className=" relative bg-gradient-to-tl from-blue-400 to-blue-900 flex flex-col w-100 h-full mt-4 opacity-50 rounded-xl ">
      {/* 
      
      to display first row on the card

       */}
      <div className="flex flex-row justify-between    ">
        {/* 
        
        To display city name country code and time

         */}
        <div className="pl-8 pt-6 text-white ">
          <div className="flex flex-row ">
            <h1 className="text-4xl ">{weather?.name}</h1>
            <span className="pl-1">{weather?.country}</span>
          </div>
          <h1 className="text-xl ">
            {formatToLocalTime(
              parseInt(weather?.dt),
              weather?.timezone,
              "hh:mm"
            )}
          </h1>
          <h1 className="text-lg">Population: {weather?.population}</h1>
        </div>

        {/* 
        
        To display temperature and description and hign temperature
        and low temperature
        
         */}
        <div className=" flex flex-col items-end pr-8 pt-4  text-white text-6xl">
          <div className="flex flex-row">
            <h1>{Math.round(weather?.temp)}</h1>
            <RiCelsiusLine></RiCelsiusLine>
          </div>
          <h1 className="text-white text-3xl pl-1 ">{weather?.description}</h1>
          <div className="flex flex-row text-xl">
            <div className="flex flex-row">
              <h1>H:{Math.round(weather?.temp_max)}&deg;</h1>
            </div>
            <div className="flex flex-row">
              <h1 className="pl-2">L:{Math.round(weather?.temp_min)}&deg;</h1>
            </div>
          </div>
        </div>
      </div>
      {/* 
      
      to display second row on the card
      
       */}
      <div className="flex flex-row justify-between text-white  px-4 mb-2">
        {/* 
       
       To display sunrise and sunset
       
        */}
        <div className="pl-4 flex flex-row justify-between w-48 ">
          <div className="flex flex-col items-center ">
            <h1 className="text-xl">
              {formatToLocalTime(
                parseInt(weather?.sunrise),
                weather?.timezone,
                "hh:mm"
              )}
            </h1>
            <BsFillSunriseFill className=" text-4xl text-yellow-500 "></BsFillSunriseFill>
            <h1>Sunrise</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl">
              {formatToLocalTime(
                parseInt(weather?.sunset),
                weather?.timezone,
                "hh:mm"
              )}
            </h1>
            <BsFillSunsetFill className=" text-4xl text-yellow-500 "></BsFillSunsetFill>
            <h1>Sunset</h1>
          </div>
        </div>
        <div className="mt-5 text-slate-50 rounded-lg p-2 text-lg bg-gradient-to-tl from-blue-400 to-blue-900 ">
          <div className="flex flex-col items-start ">
            <h1>Humidity: {weather?.humidity} </h1>
            <h1>Feels like: {Math.round(weather?.feels_like)}&deg;</h1>
          </div>
        </div>
      </div>
      {/* 
      
      l
      l
      l

      
       */}
      <button
        onClick={() => {
          handleUnFavourite(props.id);
        }}
        class="z-50 absolute  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br text-white font-bold py-2 px-4 w-30 left-100 bottom-1  rounded-full"
      >
        UnFavourite
      </button>
      <button
        onClick={handleClick}
        class="z-50 absolute  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br text-white font-bold py-2 px-4 w-30 left-72 bottom-1  rounded-full"
      >
        view
      </button>
    </div>
  );
}

export default City;
