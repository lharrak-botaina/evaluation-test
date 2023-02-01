import React from "react";
import axios from "axios";
import { BsBookmarkDash,BsFillBookmarkDashFill  } from "react-icons/bs";
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
   
      //  console.log(res.data.saved)
    })

    
  }
  handleDeleteFavorite=(name)=>{
    // console.log(id)
    axios.post('http://127.0.0.1:8000/api/DeleteCityName/'+name).then((res)=>{
     this.setState({
        save:res.data.saved
      })
   
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
   
    const city_name = this.state.city
    return (
       
<div className="all">
<div className="app">
     
     <div className="container">
       <div className="weather-side">
         <div className="weather-gradient"></div>
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
           
        
     
         <div className="location-container">
         <form onSubmit={this.handleSubmit}>
         <label>
           
          <input className='location-input' placeholder='Enter location' type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className='submit' type="submit" value="Submit" />
        </form>
     
            <button onClick={()=>this.handleDeleteFavorite(city_name)} style={{display:"none"}} id="btnDelete">
                <BsFillBookmarkDashFill color="#ffbf00" size={30} />
            </button>
            <button onClick={()=>this.saveData({city_name})} style={{display:"none"}} id="btnSave"> 
               <BsBookmarkDash color="#ffbf00" size={30} />
            </button>
           
             
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
         
         
       </div>
     </div>
     
         </div>
         
 <div className="Cart-Container">
 <div class="Header">
 <h3 class="Heading">Saved cities</h3>
 </div>
 <div>

    <table>
        <tbody>
        {this.state.save.map((item)=>
            <tr>
                {/* <td value={item.id}>{item.name}</td> */}
                <td className="list">
                    <button className="city" onClick={()=>this.handleShow(item.name)} >{item.name}</button>
                    <button onClick={()=>this.handleRemove(item.id)} id='DeleteBtn'><BsFillBookmarkDashFill color="#ffbf00" size={20}/></button>
                
                </td>
            </tr>
            )}
        </tbody>
    </table>


    
  
 </div>
 </div>
 </div>



   
    );
  }


}