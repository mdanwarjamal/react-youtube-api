import React, { useState } from "react"

import {BrowserRouter,Route} from "react-router-dom"

import Navbar from "./components/navbar/Navbar"
import Home from "./components/home/Home"
import VideoContainer from "./components/video_container/VideoContainer"
import Footer from "./components/footer/Footer"

const App = () =>{
  const CREDENTIALS = {
//     API_KEY:"AIzaSyDm2LhEBnHRRsT_CMfoCjxg2zSFGhhQIwA",
    API_KEY:"AIzaSyD9yRDU-L2nGi63VKCJkslYjCRQXlnL_Ic",
    
    MAX_RES:20,
    ORDER_BY:"relevance"
  }
  const [query,setQuery] = useState('Dragon Ball Super')
  const handleChange = (event) => setQuery(event.target.value)
  const handleSubmit=(event)=>{
    setQuery(event.target.value)
    event.preventDefault()
  }
  return(
    <>
      <BrowserRouter>
        <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
        <Route exact path="/" component={(props)=>
            <Home {...props}
              CREDENTIALS={CREDENTIALS}
              query={query} 
            />
        }/>
        <Route exact path="/videos" component={(props)=>
            <VideoContainer {...props}
              CREDENTIALS={CREDENTIALS}
              query={query}
            />
        }/>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App
