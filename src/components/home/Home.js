import React, { Component } from 'react';

import {Grid, Row, Col} from "react-flexbox-grid";
import Axios from 'axios';
import {Redirect} from "react-router-dom";

export default class Home extends Component {
    state={
        videoList:[],
        error:false,
        redirect:false,
        vid_id:"",
        vid_snip:{},
        vid_title:""
    }
    componentDidMount= ()=>{
       Axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${this.props.API_KEY}&part=snippet&chart=mostPopular&maxResults=${this.props.MAX_RES}&regionCode=IN`)
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
    handleSelection=(vid,snip,title)=>{
        this.setState({
            redirect:true,
            vid_id:vid,
            vid_snip:snip,
            vid_title:title
        });
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname:"/videos",
                state:{
                  videoList:this.state.videoList,
                  from_home:true,
                  videoId:this.state.vid_id,
                  videoSnippet:this.state.vid_snip,
                }
            }} />
        }
        const videos = this.state.videoList.length?
        (
            this.state.videoList.map((video,i)=>{
                return(
                <Col key={i} xs={12} md={6} lg={4} onClick={
                        ()=>{
                            var vid=video.id;
                            var snip=video.snippet;
                            var title=video.snippet.title;
                            this.handleSelection(vid,snip,title);
                        }
                    }>
                    <div className="jumbotron">
                        <div>
                            <img src={video.snippet.thumbnails.high.url} className="card-img-top" alt={video.snippet.description} />     
                            <h5 className="card-title">{video.snippet.title}</h5>
                            <h6 className="card-text">{video.snippet.channelTitle}</h6>
                        </div>
                    </div>  
                </Col>
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
}
