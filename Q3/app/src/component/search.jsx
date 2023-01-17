
import axios from 'axios';
import React from 'react';



class Search extends React.Component {

  state={
    nom : "",
    message:[],
    data:[]
  }

componentDidMount(){
 
}

search = (e)=>{
 var nom ={nom:e.target.value}
axios.post("http://127.0.0.1:8000/api/search",nom)
.then(res=>{
  this.setState({
    message:res.data.message
  })
  // console.log(res.data)

})

}

add = (e)=>{
  axios.post('http://127.0.0.1:8000/api/add/'+e.target.value).then((res)=>{
    this.setState({
      data:res.data.nom
    })
    console.log(res.data.nom)
  })
}


delete=(e)=>{
  axios.post('http://127.0.0.1:8000/api/delete/'+e.target.value).then((res)=>{
    this.setState({
      
    })
    console.log(res.data)
  })

}
render(){
  return (
    <div >
      <input type="text" onChange={this.search} />
      {this.state.message.map(value=>
      <h1 >{value.nom} 
      <button value={value.id}  onClick={this.add}>+</button> 
      </h1>

    )}

    <div>
      <table>
        <thead>
          <tr>
            <th>nom</th>
            <th>prenom</th>
          </tr>
        </thead>
        <tbody>
          <tr>
         
            <th>
             {/* <td>{this.state.data.map((item)=>{
              <p>{item.nom}</p>
             })}</td> */}
               
              {this.state.data} <button onClick={this.delete}>-</button>
            </th>
          
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}
}

export default Search;