import React, {useState,useEffect} from 'react'

import {Grid,Col, Row} from "react-flexbox-grid"

import Axios from "axios"

import {Redirect} from "react-router-dom"

const Home = ({CREDENTIALS,query}) => {
    const [videoList,setVideoList] = useState([])
    const [error,setError] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const [videoId,setVideoId] = useState("")
    const [videoSnippet,setVideoSnippet] = useState({})
    
    useEffect(()=>{
        Axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${CREDENTIALS.API_KEY}&part=snippet&chart=mostPopular&maxResults=${CREDENTIALS.MAX_RES}&regionCode=IN`)
        .then(response=>setVideoList(response.data.items))
        .catch(error=>setError(true)) 
    },[])
    const handleSelection=(vid,snip,title)=>{
        setRedirect(true)
        setVideoId(vid)
        setVideoSnippet(snip)
    }
    
    if(redirect){
        return <Redirect to={{
            pathname:"/videos",
            state:{
              videoList:videoList,
              fromHome:true,
              videoId:videoId,
              videoSnippet:videoSnippet,
            }
        }} />
    }
    const videos = videoList.length?
    (
        videoList.map(video=>{
            return(
            <Col key={video.id} xs={12} md={6} lg={4} onClick={
                    ()=>{
                        var vid=video.id;
                        var snip=video.snippet;
                        var title=video.snippet.title;
                        handleSelection(vid,snip,title);
                    }
                }>
                <div className="jumbotron">
                    <div>
                        <img src={video.snippet.thumbnails.high.url} alt={video.snippet.description} />     
                        <h5 >{video.snippet.title}</h5>
                        <h6 >{video.snippet.channelTitle}</h6>
                    </div>
                </div>  
            </Col>
            )
        })
    )
    :
    (
        error?
                    (
                        <h1>Please Check API Usage Quota</h1>
                    )
                    :
                    (
                        <h1>Loading...</h1>
                    )
    )
    return (
        <Grid style={{width:"95%",marginTop:"150px"}}>
            <Row>
            <div className="container">
                <div className="jumbotron">
                    <center>
                        <h1>Welcome to DummyTube</h1>
                        <h3><em>Trending Videos</em></h3>
                    </center>
                </div>
            </div>
            </Row>
            <Row>
                {videos}
            </Row>
        </Grid>
        
    )
}
export default Home