import React,{useState} from 'react';

import { useParams } from "react-router-dom"
import './App.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

function App() {
  const[data,setData]=useState({});
  const[location,setLocation]=useState('')
  const[locationID,setLocationID]=useState(40)
  let  ParamsId  = useParams();
   const API_key='1253309e30b4fb953c136c1426565be0&units=metric'
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`
    const serchLocation=(event)=>{
    
      if(event.key==='Enter'){
        axios.get(url).then((response)=>{
          setData(response.data)
          console.log(response.data)
          var x = response.data.id
          // console.log(x)
          // setLocationID(x)
         
        })
        setLocation('')
       
      }
     
    
    }
 
   
 
  return (
    <div className="app">
     
<div className="container">
  
  <div className="weather-side">
    <div className="weather-gradient"></div>
   
    <div><i class="fa-regular fa-bookmark"></i></div>
    <div className="date-container">

      <h1>{data.name}, {data.sys?<span className="location">{data.sys.country}</span>:null}</h1>
      {data.weather ? <h3 className="weather-desc">{data.weather[0].main}</h3>:null}

     
      
    </div>
    <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
      {data.main? <h1 className="weather-temp">{Math.round(data.main.temp) }°C</h1>:null}
     
    </div>
  </div>
  <div className="info-side">
    <div className="today-info-container">
      <div className='bookmark'>
     
      </div>
   

    <div className="location-container">

      <input className='location-input'
       value={location}
       onKeyDown={serchLocation}
       onChange={event=>setLocation(event.target.value)}
       placeholder='Change location' type="text" />
       <FontAwesomeIcon  icon={faBookBookmark} /> 
       
    </div>
      <div className="today-info">
        <div className="precipitation">
           <span className="title">FEELS LIKE</span>
           {data.main?<span className="value">{data.main.feels_like} %</span>:null}
          <div className="clear"></div>
        </div>
        <div className="humidity">
        <span className="title">HUMIDITY</span>
          {data.main?<span className="value">{data.main.humidity}%</span>:null}
          <div className="clear"></div>
        </div>
        <div className="wind"> <span className="title">WIND</span>
        {data.wind?<span className="value">{data.wind.speed} km/h</span>:null}
        
          <div className="clear"></div>
        </div>
      </div>
    </div>
    {/* <div className="week-container">
      <ul className="week-list">
        <li className="active"><i className="day-icon" data-feather="sun"></i><span className="day-name">Tue</span><span className="day-temp">29°C</span></li>
        <li><i className="day-icon" data-feather="cloud"></i><span className="day-name">Wed</span><span className="day-temp">21°C</span></li>
        <li><i className="day-icon" data-feather="cloud-snow"></i><span className="day-name">Thu</span><span className="day-temp">08°C</span></li>
        <li><i className="day-icon" data-feather="cloud-rain"></i><span className="day-name">Fry</span><span className="day-temp">19°C</span></li>
        <div className="clear"></div>
      </ul>
    </div> */}
    
  </div>
</div>
    </div>
  );
}

export default App;
