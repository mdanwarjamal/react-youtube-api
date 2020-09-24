import React, { Component } from 'react';
import VideoList from "../video-list/VideoList";
import Video from "../video/Video";
import {Grid,Col, Row} from "react-flexbox-grid";
import Axios from "axios";

export default class VideoContainer extends Component {
    state={
        videoList:[],
        error:false,
        videoId:"",
        videoSnippet:{},
        from_home:false,
        count:0
    }
    componentDidMount= ()=>{
        if(this.props.location.state !== undefined){
            this.setState({
                from_home:this.props.location.state.from_home,
                videoList:this.props.location.state.videoList,
                videoId:this.props.location.state.videoId,
                videoSnippet:this.props.location.state.videoSnippet,
                count:1
            })
       }else{
            Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${this.props.API_KEY}&q=${this.props.QUERY}&part=snippet,id&order=${this.props.ORDER_BY}&maxResults=${this.props.MAX_RES}&safeSearch=strict&type=video`)
            .then(response=>{
                this.setState({
                    videoList:response.data.items
                })
            })
            .catch(error=>{
                this.setState({
                    error:true
                })
            })
        }   
    }
    handleVideoSelection=(returnId,vidSnippet)=>{
        Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${this.props.API_KEY}&part=snippet&maxResults=${this.props.MAX_RES}&type=video&relatedToVideoId=${returnId}`)
            .then(response=>{
                 this.setState({
                     videoList:response.data.items,
                     count:0
                 })
          })
          .catch(error=>{
             this.setState({
                 error:true
             })
          })
          this.setState({
            videoId:returnId,
            videoSnippet:vidSnippet
        });
    }  
    render() {
        console.log("************************************************")
        console.log("INSIDE VIDEOCONTAINER.JS")
        console.log("PROPS")
        console.log(this.props)
        console.log("STATE")
        console.log(this.state)
        console.log("************************************************")
        const videos = this.state.videoList.length?
        (
            this.state.videoList.map((video,i)=>{
                return(
                    <VideoList key={i} id={
                        (this.state.from_home && this.state.count===1)?video.id:video.id.videoId
                    } snippet={video.snippet} title={video.channelTitle} handleVideoSelection={this.handleVideoSelection}/>
                )
            })
        )
        :
        (
            this.state.error?
                        (
                            <h1>Please Check API Usage Quota</h1>
                        )
                        :
                        (
                            <h1>Loading...</h1>
                        )
        )
        return (
            <Grid style={{width:"95%",marginTop:"100px"}}>
              <Row>
                  <Col md={12} lg={7}> 
                  <Video videoId={this.state.videoId} snippet={this.state.videoSnippet}/>
                  </Col>
                  <Col md={12} lg={5} style={{overflowY:"scroll",height:"600px"}}>
                      {videos}
                  </Col>
              </Row>
          </Grid>
        )
    }
}