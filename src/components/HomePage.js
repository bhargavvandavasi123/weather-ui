import { React, useEffect, useState } from "react";
import City from "./City";
import { useQueries, useQuery } from "@tanstack/react-query";
import SearchCity from "./SearchCity";
import DetailedWeatherView from "./DetailedWeatherView";
import getFormattedWeatherData from "../services/weatherService";

const HomePage = (props) => {
  //fetch favourite city names
  const { data } = useQuery(["cities"], () => {
    return fetch("https://weather-wind-api.azurewebsites.net/cities")
      .then((res) => res.json())
      .then((data) => data);
  });
  console.log(data);

  const [displayHomePage, setDisplayHomePage] = useState(true);
  const [cityName, setCityName] = useState([]);
  const [favouriteValue, setFavouriteValue] = useState(false);

  const handleOnSearchChange = (searchData) => {
    setCityName(searchData.value);
    setDisplayHomePage(!displayHomePage);
    setFavouriteValue(true);

    const cities = data.map((val) => val.city);
    if (cities.includes(searchData.value)) {
      setFavouriteValue(false);
    }
  };

  const handleDetailedView = (weather) => {
    setDisplayHomePage(!displayHomePage);
    setCityName(weather);
    setFavouriteValue(false);
  };

  const handleMainView = (viewData) => {
    setDisplayHomePage(!displayHomePage);
    window.location.reload();
  };

  return (
    <div className="relative">
      {displayHomePage && (
        <div className="flex flex-col items-center my-4">
          <div className="flex flex-row w-full items-center justify-center space-x-4 p-2">
            <SearchCity onSearchChange={handleOnSearchChange} />
          </div>
          <div className="flex flex-col w-100 h-100 overflow-auto scrollbar-hide items-center ">
            {displayHomePage &&
              data?.map((value) => {
                return (
                  <City
                    key={value._id}
                    id={value._id}
                    name={value.city}
                    onDetailedView={handleDetailedView}
                  />
                );
              })}
          </div>
        </div>
      )}
      {!displayHomePage && (
        <div className="absolute  w-full h-full   rounded-md ">
          <DetailedWeatherView
            onMainView={handleMainView}
            name={cityName}
            favourite={favouriteValue}
          />
        </div>
      )}
      {/* {displayDetailViewPage && (
        <div className="absolute  w-full h-full top-10 left-1/4 rounded-md ">
          <DetailedWeatherView onMainView={handleMainView} name="london" />
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
