import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: 0,
    windSpeed: 0,
    temperature: 0,
    location: '',
    icon: clear,
  });

  const allIcons = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': cloud,
    '03n': cloud,
    '04d': drizzle,
    '04n': drizzle,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain,
    '13d': snow,
    '13n': snow,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search('Hattiesburg');
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search city...' />
        <img src={search_icon} alt='Search' onClick={() => search(inputRef.current.value)} />
      </div>
      <img src={weatherData.icon} alt='Weather Icon' className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°F</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='column'>
          <img src={humidity} alt='Humidity' />
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>

          <img src={wind} alt='Wind Speed' />
          <p>{weatherData.windSpeed} mph</p>
          <span>Windspeed</span>
        </div>
      </div>
      <div className='info-section'>
        <footer>Made by Stephen Joshi</footer>
        <div className='info-container'>
          <button className='info-button'>Info</button>
          <div className='info-paragraph'>
            <p>
              The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
            </p>
            <p>
              Our Product Manager Accelerator community is ambitious and committed. Through our program, they have learned, honed, and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
