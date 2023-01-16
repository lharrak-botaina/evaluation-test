
import axios from 'axios';
import React from 'react';



class Search extends React.Component {

  state={
    nom : "",
    message:[]
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
  console.log(res.data)

})

}
render(){
  return (
    <div >
      <input type="text" onChange={this.search} />
      {this.state.message.map(value=>
      <h1>{value.nom} </h1>

    )}
    </div>
  );
}
}

export default Search;