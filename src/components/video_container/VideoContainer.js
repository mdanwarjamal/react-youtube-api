import React, {useState,useEffect} from 'react'

import {Grid,Col, Row} from "react-flexbox-grid"

import Axios from "axios"

import VideoPlayer from "../video_player/VideoPlayer"
import VideoList from "../video_list/VideoList"

const VideoContainer = (props) => {
    const [videoList,setVideoList] = useState([])
    const [error,setError] = useState(false)
    const [videoId,setVideoId] = useState("")
    const [videoSnippet,setVideoSnippet] = useState({})
    const [fromHome,setFromHome] = useState(false)
    useEffect(()=>{
        if(props.location.state){
            setFromHome(props.location.state.fromHome)
            setVideoList(props.location.state.videoList)
            setVideoId(props.location.state.videoId)
            setVideoSnippet(props.location.state.videoSnippet)
       }else{
            Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${props.CREDENTIALS.API_KEY}&q=${props.query}&part=snippet,id&order=${props.CREDENTIALS.ORDER_BY}&maxResults=${props.CREDENTIALS.MAX_RES}&safeSearch=strict&type=video`)
            .then(response=>setVideoList(response.data.items))
            .catch(error=>setError(true))
        }
    },[])
    useEffect(()=>{
        Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${props.CREDENTIALS.API_KEY}&q=${props.query}&part=snippet,id&order=${props.CREDENTIALS.ORDER_BY}&maxResults=${props.CREDENTIALS.MAX_RES}&safeSearch=strict&type=video`)
        .then(response=>{
            setVideoList(response.data.items)
        })
        .catch(error=>setError(true))
    },[props.query])
    const handleVideoSelection=(returnId,vidSnippet)=>{
        Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${props.CREDENTIALS.API_KEY}&part=snippet&maxResults=${props.CREDENTIALS.MAX_RES}&type=video&relatedToVideoId=${returnId}`)
            .then(response=>{
                setVideoList(response.data.items)
            })
            .catch(error=>setError(true))
        setVideoId(returnId)
        setVideoSnippet(vidSnippet)
    }  
    const videos = videoList.length?
        (
            videoList.map((video,i)=>{
                return(
                    <VideoList key={i} videoId={
                        (fromHome)? video.id : video.id.videoId
                    } videoSnippet={video.snippet} handleVideoSelection={handleVideoSelection}/>
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
                  <Col md={12} lg={7}> 
                  <VideoPlayer videoId={videoId} videoSnippet={videoSnippet}/>
                  </Col>
                  <Col md={12} lg={5} style={{overflowY:"scroll",height:"600px"}}>
                      {videos}
                  </Col>
              </Row>
          </Grid>
        )
}
export default VideoContainer