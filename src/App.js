import React, { Component } from 'react';

import {BrowserRouter,Route} from "react-router-dom";

import './App.css';

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import VideoContainer from './components/video-container/VideoContainer';
import Home from './components/home/Home';

class App extends Component{
  state = {
    API_KEY:"AIzaSyDm2LhEBnHRRsT_CMfoCjxg2zSFGhhQIwA",
    MAX_RES:20,
    ORDER_BY:"relevance",
    query_text:"TCS"
  }
  handleChange=(event)=>{
    this.setState({
        query_text:event.target.value
    })
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.setState({
        query_text:event.target.value
    })
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <Navbar handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
          <Route exact path="/" component={(props)=>
              <Home {...props}
              API_KEY={this.state.API_KEY} 
              MAX_RES={this.state.MAX_RES} 
              QUERY={this.state.query_text} 
              ORDER_BY={this.state.ORDER_BY} />
          }/>
          <Route exact path="/videos" component={(props)=>
              <VideoContainer {...props}
              API_KEY={this.state.API_KEY} 
              MAX_RES={this.state.MAX_RES} 
              QUERY={this.state.query_text} 
              ORDER_BY={this.state.ORDER_BY} />
          }/>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
