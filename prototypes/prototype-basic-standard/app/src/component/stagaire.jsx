import React, { Component } from "react";
import axios from "axios";
import { render } from "@testing-library/react";


export default class Stagaire extends Component{

    constructor(props){
        super(props);
        this.state={
            Nom:'',
            stagaire:'',
            resultat:''
        }
    }

       
    getData=()=>{
        axios.get('http://127.0.0.1:8000/api/stagaire').then((res)=>{
            this.setState({
                stagaire:res.data[0],
                // prenomStagaire:res.data.prenom,

            })
           
        })
    }
    checkData=(e)=>{
        axios.get('http://127.0.0.1:8000/api/check/'+e.target.value).then((res)=>{
            this.setState({
                resultat:res.data.message,
                // prenomStagaire:res.data.prenom,

            })
            console.log(res.data)
        })
    }

    





     
    componentDidMount() {
        this.getData()
       
      }
    render(){
        return(
           <div>
    
    <table>
                <thead>
                    <tr>
                    
                    
                    <th scope="col">nom</th>
                    <th scope="col">prenom</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>{this.state.stagaire.nom}</th>
                    <th>{this.state.prenom}</th>
                </tr>
                </tbody>
                </table>
    
    
    
    
             <form>
      <label>
        Name:
        <input type="text"  name="name" onChange={this.checkData}/>
      </label>
    
    </form>
    <p>{this.state.resultat}</p>
    <div>
   
    </div>
   
           </div>
        )
    }
}

