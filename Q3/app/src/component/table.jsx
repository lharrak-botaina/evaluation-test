import React, { Component } from "react";
import axios from "axios";


export default class Test extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [],
            message : '',
            selectedData : []
        }
    }
    getData = (e) => {
        axios.get('http://localhost:8000/api/stagiaire/'+e.target.value).then((res) => {
          this.setState({
            data: res.data
          });
        });
      };
      selectData = (item)=> {
        if(!this.state.selectedData.includes(item)){
            this.setState({
                selectedData : [...this.state.selectedData, item]
            })
        }
      }

      removeData = (item)=>{
            let filteredArray = this.state.selectedData.filter(key => key !== item)
            this.setState({selectedData: filteredArray});
      }

  render() {
    return (
      <div className='container'>
        {/* <h3>Question 1</h3>
            <input type='search' placeholder='Search'  onChange={this.getData} className='form-control'/>
            <p className='text-center'>{this.state.data.length !== 0 ? 'yes' : "no"}</p>
        <h3>Question 2</h3>
            {this.state.data.map((item) => (
                <><p className='text-center'>{item?.name}</p>
                <p className='text-center'>{item?.lastName}</p></>
            ))} */}
        <h3>Question 4</h3>
        <div className='row'>
            <div className='col-md-6'>
            <input type='search' placeholder='Search' onChange={this.getData}  className='form-control'/>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item) => (
                        <tr>
                            <td>{item?.nom}</td>
                            <td>{item?.prenom}</td>
                            <td><button class="btn btn-outline-success" onClick={ () => this.selectData(item)}>+</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className='col-md-6'>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.selectedData.map((item => 
                            <tr>
                                <td>{item?.nom}</td>
                                <td></td>
                                <td><button class="btn btn-outline-success" onClick={ () => this.removeData(item)}>-</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
      </div>
    )
  }
}