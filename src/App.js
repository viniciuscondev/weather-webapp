import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Data from './Date';
import DateNight from './DateNight';
import { Link } from 'react-router-dom';



function App() {
  
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'en',
        units: 'metric'
      }  
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  let d = new Date();
  let hora = d.getHours();
    
  if(location == false){
    return (
      <div className="loadingBackground">
        <p className="preload">Please enable your browser location</p>
        <p id="credit">Photo from <a href="https://pixabay.com/pt/users/FelixMittermeier-4397258/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3625405">FelixMittermeier</a> by <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3625405">Pixabay</a></p>
      </div>
    ) 
} else if (weather == false) {
  return (
    <div className="loadingBackground">
      <p className="preload">Loading weather information...</p>
      <p id="credit">Photo from <a href="https://pixabay.com/pt/users/FelixMittermeier-4397258/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3625405">FelixMittermeier</a> by <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3625405">Pixabay</a></p>

    </div>
  )

}else if (hora > 6 && hora < 18) {
    return (
      <Fragment className="Day">
        <div id="back" className={weather['weather'][0]['main']}>
          <Link to="/imperial"><button className="button">°F</button></Link>
          <Data/>
          <div className="title">
            <h1>Weather in {weather['name']} ({weather['weather'][0]['main']})</h1>
          </div>
          <div className="app">
            <div id="ul">
              <ul>
                <li>Max: {weather['main']['temp_max']} °C</li>
                <li>Min: {weather['main']['temp_min']} °C</li>
                <li>Feels like: {weather['main']['feels_like']} °C</li>
                <li>Wind: {weather['wind']['speed']} meter/sec</li>
                <li>Humidity: {weather['main']['humidity']}%</li>
              </ul>
            </div>
            <div id="temp">
              <p className="current">{weather['main']['temp']} °C</p>
            </div>
            <p id="credit"></p>

          </div>
        </div>
      </Fragment>
    );

} else {
  return (
    <Fragment className="Night">
      <div id="back" className={weather['weather'][0]['main'] + "Night"}>
        <Link to="/imperial"><button className="button">°F</button></Link>
        <DateNight/>
        <div className="title">
          <h1>Weather in {weather['name']} ({weather['weather'][0]['main']})</h1>
        </div>
        <div className="app">
          <div id="ul">
            <ul>
              <li>Max: {weather['main']['temp_max']} °C</li>
              <li>Min: {weather['main']['temp_min']} °C</li>
              <li>Feels like: {weather['main']['feels_like']} °C</li>
              <li>Wind: {weather['wind']['speed']} meter/sec</li>
              <li>Humidity: {weather['main']['humidity']}%</li>
            </ul>
          </div>
          <div id="temp">
            <p className="current">{weather['main']['temp']} °C</p>
          </div>
          <p id="credit"></p>

        </div>
      </div>
    </Fragment>
  );
}

}


export default App;
