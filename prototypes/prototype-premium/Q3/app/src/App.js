// import logo from './logo.svg';
// import './App.css';
import axios from 'axios'
import React from 'react';


class App extends React.Component {

  state={
    Nom : "",
    message:[],
    data:[],
    List:[],
    id:"",
    showList:[]
  }

componentDidMount(){
  axios.get("http://127.0.0.1:8000/api/index")
  .then(res=>{
    this.setState({
      data:res.data
    })
    // console.log(res.data)
  })
}

handleChange = (e)=>{
 var nom ={Nom:e.target.value}
axios.post("http://127.0.0.1:8000/api/search",nom)
.then(res=>{
  this.setState({
    message:res.data.message
  })
  // console.log(res.data)

})
}

handleClick= (id) =>{
  console.log(id)
  let dataList  = this.state.data;
  let ID = dataList.findIndex(value=>value.Id ===id)
  dataList.splice(ID,1)
  this.setState({data:dataList})

 axios.get("http://127.0.0.1:8000/api/list/"+id)
 .then(res=>{
   
  let list = this.state.showList
  list.push(res.data.message)  
  this.setState({list:list})
})
}
handleDelete= (id) =>{
  
  let dataList  = this.state.showList;
  let ID = dataList.findIndex(value=>value.Id ===id)
  dataList.splice(ID,1)
  this.setState({showList:dataList})

 axios.get("http://127.0.0.1:8000/api/list/"+id)
 .then(res=>{
   
  let list = this.state.data
  list.push(res.data.message)  
  this.setState({list:list})
})
}


render(){
  console.log(this.state.showList);
  return (
    <div>
      <div id='cadre1'>
     <input  id="cadre3" type="text" onChange={this.handleChange} />
      {this.state.message.map(value=>
      <h1>{value.Nom} </h1>
    )}
    <div id='cadre2'>
    <table  >
      
      <tbody>
      {this.state.data.map(value=>
       <tr>
        <td>{value.Nom}</td>
        <td>
          <button className='btn btn-primary'  onClick={()=>this.handleClick(value.Id)}>+</button>
        </td>
       </tr>
       )}
      </tbody>
</table>
</div>
</div>
<div id='cadre4'>
 <th></th> 
 {this.state.showList.map(valuee=>
 <div>
 <p>{valuee.Nom}</p>
        
  <button className='btn btn-danger'  onClick={()=>this.handleDelete(valuee.Id)}>-</button>
  </div>
)}

  
</div>
    </div>
  );
}
}

export default App;