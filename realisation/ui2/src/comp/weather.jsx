import React from "react";
import axios from "axios";
import { AiFillHeart  } from "react-icons/ai";
import '../App.css';
export default class Weather extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      value:'',
      save:[],
      city: [],
      temperature: [],
      country: [],
      weather:[],
      feels_like:[],
      humidity:[],
      wind:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.state.value+"&appid=1253309e30b4fb953c136c1426565be0&units=metric")
    .then((res) => {

      this.setState({
        city: res.data.name,
        temperature: res.data.main.temp,
       country: res.data.sys.country,
       weather:res.data.weather[0].main,
       feels_like:res.data.main.feels_like,
       humidity:res.data.main.humidity,
       wind:res.data.wind.speed,
      

       
    })
    axios.post(' http://127.0.0.1:8000/api/checkCity?city='+this.state.value, {})
    .then( (response)=> {
      console.log(response.data.status)
        if(response.data.status == "success"){

          const btnSave = document.getElementById('btnSave')
          btnSave.style.display="inline"
          const btnDelete = document.getElementById('btnDelete')
          btnDelete.style.display="none"
        }
        else{
          const btnDelete = document.getElementById('btnDelete')
          btnDelete.style.display="inline"
          const btnSave = document.getElementById('btnSave')
          btnSave.style.display="none"
         
        }
      }
    ) 
  }
   
    
    // console.log(res.data)
    
        );
   
   

    
  }
  
saveData = (city_name) => {
    const save_city = city_name.city_name;

    axios.post(' http://127.0.0.1:8000/api/save?city='+save_city, {})
    .then( (response)=> 
     this.setState({
        save:response.data.saved
      })
    ) 
    const btnSave = document.getElementById('btnSave')
    btnSave.style.display="none"
    const btnDelete = document.getElementById('btnDelete')
    btnDelete.style.display="inline"
  }

  componentDidMount(){

    axios.get('http://127.0.0.1:8000/api/list').then((res)=>{
     this.setState({
        save:res.data.saved
      })
      //  console.log(res.data.saved)
    })

  }
  handleRemove=(id)=>{
    // console.log(id)
    axios.post('http://127.0.0.1:8000/api/delete/'+id).then((res)=>{
     this.setState({
        save:res.data.saved
      })
    console.log('ddd')
      //  console.log(res.data.saved)
    })

    
  }
  handleDeleteFavorite=(name)=>{
    // console.log(id)
    axios.post('http://127.0.0.1:8000/api/DeleteCityName/'+name).then((res)=>{
     this.setState({
        save:res.data.saved
      })
    console.log('ddd')
      //  console.log(res.data.saved)
    const btnSave = document.getElementById('btnSave')
    btnSave.style.display="inline"
    const btnDelete = document.getElementById('btnDelete')
    btnDelete.style.display="none"
    })

    
  }
  
  handleShow(name) {
    axios.get("https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=1253309e30b4fb953c136c1426565be0&units=metric")
    .then((res) => {
      this.setState({
        city: res.data.name,
        temperature: res.data.main.temp,
       country: res.data.sys.country,
       weather:res.data.weather[0].main,
       feels_like:res.data.main.feels_like,
       humidity:res.data.main.humidity,
       wind:res.data.wind.speed

       
    })
    
    // console.log(res.data)
    }
        );
   
   

    
  }

  render() {
      // console.log(this.state.save)

    // this.getData();
    const city_name = this.state.city
    return (
       
<div className="all">
<div className="app">
     
     <div className="container">
       <div className="weather-side">
         <div className="weather-gradient"></div>
        
         <div><i class="fa-regular fa-bookmark"></i></div>
         <div className="date-container">
   
           <h1>{this.state.city}, <span className="location">{this.state.country}</span></h1>
           <h3 className="weather-desc">{this.state.weather}</h3>
     
          
           
         </div>
         <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
            <h1 className="weather-temp">{Math.round(this.state.temperature) }°C</h1>
          
         </div>
       </div>
       <div className="info-side">
         <div className="today-info-container">
           <div className='bookmark'>
          
           </div>
        
     
         <div className="location-container">
         <form onSubmit={this.handleSubmit}>
         <label>
           
          <input className='location-input' placeholder='Enter location' type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className='submit' type="submit" value="Submit" />
        </form>
     
         <button onClick={()=>this.handleDeleteFavorite(city_name)} style={{display:"none"}} id="btnDelete"> -</button>
        <button onClick={()=>this.saveData({city_name})} style={{display:"none"}} id="btnSave">  <AiFillHeart color="#FF0000" /></button>
           
            
         </div>
           <div className="today-info">
             <div className="precipitation">
                <span className="title">FEELS LIKE</span>
                <span className="value">{this.state.feels_like} °C</span>
               <div className="clear"></div>
             </div>
             <div className="humidity">
             <span className="title">HUMIDITY</span>
               <span className="value">{this.state.humidity}%</span>
               <div className="clear"></div>
             </div>
             <div className="wind"> <span className="title">WIND</span>
            <span className="value">{this.state.wind} km/h</span>
             
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
         
 <div className="Cart-Container">
 <div class="Header">
 <h3 class="Heading">saved cities</h3>
 <div>
  <ul>
  {this.state.save.map((item)=>
  <div>
    <li value={item.id}>{item.name}</li>
    <button onClick={()=>this.handleRemove(item.id)} >-</button>
    
    <button onClick={()=>this.handleShow(item.name)} >show</button>
    </div>
  )}
    
    
  </ul>
 </div>
 </div>
 </div>


</div>
   
    );
  }


}