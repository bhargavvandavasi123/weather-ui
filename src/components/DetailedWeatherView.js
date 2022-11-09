import { React, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import getFormattedWeatherData from "../services/weatherService";
import { RiCelsiusLine } from "react-icons/ri";
import { formatToLocalTime } from "../services/weatherService";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import WindSpeed from "../noun-wind-direction.svg";
import WindDirection from "../noun-wind.svg";
import Windgust from "../noun-air-1278599.svg";
const primary = red[500];

const postData = async (cityData) => {
  const doThis = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: cityData.city,
      }),
    };

    const response = fetch("http://localhost:3000/cities/", options);
    return response.json();
  };

  doThis();
};

function DetailedWeatherView(props) {
  const [fav, setFav] = useState();
  const fetchCities = () => {
    return getFormattedWeatherData({
      q: props.name,
      units: "metric",
    });
  };
  const { data: weather, refetch } = useQuery(
    ["city", props.name],
    fetchCities
  );
  console.log(weather);
  //Material UI components start
  const bull = () => {
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>;
  };
  //Material UI components ends

  const { mutate, isLoading, isError } = useMutation(postData, {
    onSuccess: (successData) => {
      console.log(successData);
    },
  });

  useEffect(() => {
    setFav(props.favourite);
  }, []);

  const handleClick = () => {
    props.onMainView();
  };
  const handlefavourite = () => {
    mutate({ city: props?.name });

    setFav(false);
  };

  return (
    <div class="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
      <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-6xl font-bold">
              {Math.round(weather?.temp)}°C
            </span>
            <span class="font-semibold mt-1 text-gray-500">
              {weather?.name}
            </span>
          </div>
          <svg
            class="h-24 w-24 fill-current text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
          </svg>
        </div>
        <div class="flex justify-between mt-12">
          <div class="flex flex-col items-center">
            <span class="font-semibold text-lg">
              {Math.round(weather?.list[0]?.temp)}°C
            </span>
            <svg
              class="h-10 w-10 fill-current text-gray-400 mt-3"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
            <span class="font-semibold mt-1 text-sm">
              {weather?.list[0]?.title}
            </span>
          </div>

          <div class="flex flex-col items-center">
            <span class="font-semibold text-lg">
              {Math.round(weather?.list[1]?.temp)}°C
            </span>
            <svg
              class="h-10 w-10 fill-current text-gray-400 mt-3"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
            <span class="font-semibold mt-1 text-sm">
              {weather?.list[1]?.title}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-semibold text-lg">
              {Math.round(weather?.list[2]?.temp)}°C
            </span>
            <svg
              class="h-10 w-10 fill-current text-gray-400 mt-3"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
            </svg>
            <span class="font-semibold mt-1 text-sm">
              {weather?.list[2]?.title}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-semibold text-lg">
              {Math.round(weather?.list[3]?.temp)}°C
            </span>
            <svg
              class="h-10 w-10 fill-current text-gray-400 mt-3"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
            </svg>

            <span class="font-semibold mt-1 text-sm">
              {weather?.list[3]?.title}
            </span>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-semibold text-lg">
              {Math.round(weather?.list[4]?.temp)}°C
            </span>
            <svg
              class="h-10 w-10 fill-current text-gray-400 mt-3"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path d="M19.78,17.51c-2.47,0-6.57-1.33-8.68-5.43C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12 c0,0.14,0.02,0.28,0.02,0.42C2.61,12.16,3.28,12,3.98,12c0,0,0,0,0,0c0-3.09,1.73-5.77,4.3-7.1C7.78,7.09,7.74,9.94,9.32,13 c1.57,3.04,4.18,4.95,6.8,5.86c-1.23,0.74-2.65,1.15-4.13,1.15c-0.5,0-1-0.05-1.48-0.14c-0.37,0.7-0.94,1.27-1.64,1.64 c0.98,0.32,2.03,0.5,3.11,0.5c3.5,0,6.58-1.8,8.37-4.52C20.18,17.5,19.98,17.51,19.78,17.51z" />
                  <path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z" />
                </g>
              </g>
            </svg>
            <span class="font-semibold mt-1 text-sm">
              {" "}
              {weather?.list[4]?.title}
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg w-1/4">
            {weather?.list[0]?.title}
          </span>
          <div class="flex items-center justify-end w-1/4 ">
            <span class="font-semibold">{weather?.list[0]?.humidity}%</span>
            <svg
              class="w-6 h-6 fill-current ml-1"
              viewBox="0 0 16 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1,0,0,1,-4,-2)">
                <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
              </g>
            </svg>
          </div>
          <div class="flex items-center justify-end w-1/4 font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4"
              src={Windgust}
              alt="React Logo"
            />
            <span>{weather?.list[0]?.windGust}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 "
              src={WindDirection}
              alt="React Logo"
            />
            <span>{weather?.list[0]?.windDegree}°</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 pr-2"
              src={WindSpeed}
              alt="React Logo"
            />
            <span>{weather?.list[0]?.windSpeed}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  pr-2 font-semibold">
            <svg
              class="h-8 w-8 fill-current w-1/4"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
          </div>
          <span class="font-semibold text-lg w-1/4 ">18° / 32°</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg w-1/4">
            {weather?.list[1]?.title}
          </span>
          <div class="flex items-center justify-end w-1/4 ">
            <span class="font-semibold">{weather?.list[1]?.humidity}%</span>
            <svg
              class="w-6 h-6 fill-current ml-1"
              viewBox="0 0 16 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1,0,0,1,-4,-2)">
                <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
              </g>
            </svg>
          </div>
          <div class="flex items-center justify-end w-1/4 font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4"
              src={Windgust}
              alt="React Logo"
            />
            <span>{weather?.list[1]?.windGust}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 "
              src={WindDirection}
              alt="React Logo"
            />
            <span>{weather?.list[1]?.windDegree}°</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 pr-2"
              src={WindSpeed}
              alt="React Logo"
            />
            <span>{weather?.list[1]?.windSpeed}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  pr-2 font-semibold">
            <svg
              class="h-8 w-8 fill-current w-1/4"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
          </div>
          <span class="font-semibold text-lg w-1/4 ">16° / 28°</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg w-1/4">
            {weather?.list[2]?.title}
          </span>
          <div class="flex items-center justify-end w-1/4 ">
            <span class="font-semibold">{weather?.list[2]?.humidity}%</span>
            <svg
              class="w-6 h-6 fill-current ml-1"
              viewBox="0 0 16 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1,0,0,1,-4,-2)">
                <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
              </g>
            </svg>
          </div>
          <div class="flex items-center justify-end w-1/4 font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4"
              src={Windgust}
              alt="React Logo"
            />
            <span>{weather?.list[2]?.windGust}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 "
              src={WindDirection}
              alt="React Logo"
            />
            <span>{weather?.list[2]?.windDegree}°</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 pr-2"
              src={WindSpeed}
              alt="React Logo"
            />
            <span>{weather?.list[2]?.windSpeed}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  pr-2 font-semibold">
            <svg
              class="h-8 w-8 fill-current w-1/4"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
          </div>
          <span class="font-semibold text-lg w-1/4 ">22° / 30°</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg w-1/4">
            {weather?.list[3]?.title}
          </span>
          <div class="flex items-center justify-end w-1/4 ">
            <span class="font-semibold">{weather?.list[3]?.humidity}%</span>
            <svg
              class="w-6 h-6 fill-current ml-1"
              viewBox="0 0 16 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1,0,0,1,-4,-2)">
                <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
              </g>
            </svg>
          </div>
          <div class="flex items-center justify-end w-1/4 font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4"
              src={Windgust}
              alt="React Logo"
            />
            <span>{weather?.list[3]?.windGust}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 "
              src={WindDirection}
              alt="React Logo"
            />
            <span>{weather?.list[3]?.windDegree}°</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 pr-2"
              src={WindSpeed}
              alt="React Logo"
            />
            <span>{weather?.list[3]?.windSpeed}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  pr-2 font-semibold">
            <svg
              class="h-8 w-8 fill-current w-1/4"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
          </div>
          <span class="font-semibold text-lg w-1/4 ">12° / 28°</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg w-1/4">
            {weather?.list[4]?.title}
          </span>
          <div class="flex items-center justify-end w-1/4 ">
            <span class="font-semibold">{weather?.list[4]?.humidity}%</span>
            <svg
              class="w-6 h-6 fill-current ml-1"
              viewBox="0 0 16 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1,0,0,1,-4,-2)">
                <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
              </g>
            </svg>
          </div>
          <div class="flex items-center justify-end w-1/4 font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4"
              src={Windgust}
              alt="React Logo"
            />
            <span>{weather?.list[4]?.windGust}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 "
              src={WindDirection}
              alt="React Logo"
            />
            <span>{weather?.list[4]?.windDegree}°</span>
          </div>
          <div class="flex items-center justify-end w-1/4  font-semibold">
            <img
              class="h-8 w-8 fill-current w-1/4 pr-2"
              src={WindSpeed}
              alt="React Logo"
            />
            <span>{weather?.list[4]?.windSpeed}</span>
          </div>
          <div class="flex items-center justify-end w-1/4  pr-2 font-semibold">
            <svg
              class="h-8 w-8 fill-current w-1/4"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
          </div>
          <span class="font-semibold text-lg w-1/4 ">24° / 31°</span>
        </div>
      </div>
      <Button onClick={handleClick}>close</Button>
      {console.log(fav)}
      {fav && (
        <Button className="z-20" onClick={handlefavourite}>
          Add to favourites
        </Button>
      )}
    </div>
    // <Box sx={{ minWidth: 175 }} elevation={3}>
    //   {console.log(props)}
    //   <Card variant="outlined" sx={{ width: 1000 }}>
    //     <CardContent>
    //       <Typography
    //         sx={{ fontSize: 40 }}
    //         align="center"
    //         color={primary}
    //         gutterBottom
    //       >
    //         {weather?.name}
    //       </Typography>
    //       <Typography className="flex flex-row justify-between    ">
    //         <Typography variant="h5" component="div" color={primary}>
    //           <Typography className="pl-8 pt-6 text-red ">
    //             <Typography className="flex flex-row ">
    //               <Typography variant="h5" className="text-4xl ">
    //                 {weather?.name}
    //               </Typography>
    //               <Typography className="pl-1">{weather?.country}</Typography>
    //             </Typography>
    //             <Typography variant="h2" className="text-xl ">
    //               {formatToLocalTime(
    //                 parseInt(weather?.dt),
    //                 weather?.timezone,
    //                 "hh:mm"
    //               )}
    //             </Typography>
    //             <h1 className="text-lg">Population: {weather?.population}</h1>
    //           </Typography>
    //           <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //             <Typography
    //               variant="h5"
    //               className=" flex flex-col items-end pr-8 pt-4  text-red "
    //             >
    //               <Typography variant="h5" className="flex flex-row">
    //                 <Typography variant="h1">
    //                   {console.log(weather?.temp)}
    //                   {Math.round(weather?.temp)}
    //                 </Typography>
    //                 <RiCelsiusLine></RiCelsiusLine>
    //               </Typography>
    //               <h1 className="text-red text-3xl pl-1 ">
    //                 {weather?.description}
    //               </h1>
    //               <Typography className="flex flex-row text-xl">
    //                 <Typography className="flex flex-row">
    //                   <h1>H:{Math.round(weather?.temp_max)}&deg;</h1>
    //                 </Typography>
    //                 <Typography className="flex flex-row">
    //                   <h1 className="pl-2">
    //                     L:{Math.round(weather?.temp_min)}&deg;
    //                   </h1>
    //                 </Typography>
    //               </Typography>
    //             </Typography>
    //           </Typography>
    //         </Typography>
    //       </Typography>
    //       <Typography variant="body2">
    //         well meaning and kindly.
    //         <br />
    //         {'"a benevolent smile"'}
    //       </Typography>
    //     </CardContent>
    //     <CardActions>
    //       <Button size="small">Learn More</Button>
    //       <Button onClick={handleClick}>close</Button>
    //       {console.log(fav)}
    //       {fav && (
    //         <Button className="z-20" onClick={handlefavourite}>
    //           Add to favourites
    //         </Button>
    //       )}
    //     </CardActions>
    //   </Card>
    // </Box>
  );
}

export default DetailedWeatherView;

{
  /* <div className=" z-10 bg-gradient-to-tl from-blue-400 to-blue-900 flex flex-col w-1/2 h-100 mt-4 opacity-50 rounded-xl  bg-slate-600 text-red-600 text-4xl ">
      {props.name}

      {fav && (
        <button className="z-20" onClick={handlefavourite}>
          Add to favourites
        </button>
      )}
      <button onClick={handleClick}>close</button>
      <Button variant="text">Text</Button>
    </div> */
}

// const handleClick = (props) => {
//   props.data.onMainView();
//   //   props.onMainView();
// };

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

// const card = (props) => {
//   return (
//     <div>
//       {console.log(props)}
//       <CardContent>
//         <Typography
//           sx={{ fontSize: 40 }}
//           align="center"
//           color={primary}
//           gutterBottom
//         >
//           {props?.data?.name}
//         </Typography>
//         <Typography variant="h5" component="div" color={primary}>
//           be{bull}nev{bull}o{bull}lent
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           adjective
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//         <Button
//           onClick={() => {
//             handleClick(props);
//           }}
//         >
//           close
//         </Button>
//         {/* {fav && (
//           <button className="z-20" onClick={handlefavourite}>
//             Add to favourites
//           </button>
//         )} */}
//       </CardActions>
//     </div>
//   );
// };
// const OutlinedCard = (props) => {
//   return (
//     <Box sx={{ minWidth: 175 }} elevation={3}>
//       {console.log(props)}
//       <Card variant="outlined" sx={{ width: 1000 }}>
//         {card(props)}
//       </Card>
//     </Box>
//   );
// };
