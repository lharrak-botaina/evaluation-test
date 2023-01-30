import React, { Component } from "react";
import axios from "axios";

export default class Weather extends Component{
    constructor(props){
      super(props);
      this.state={
        data:{},
        location:''

      }
     
    }
     API_key='1253309e30b4fb953c136c1426565be0&units=metric'

    url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.API_key}`
    getData=()=>{
      axios.get(this.url).then((res)=>{
        console.log(res.data)
      })
    }
   

       
      
     
   
    render(){
      return(
        <div></div>
      )
    }
}
