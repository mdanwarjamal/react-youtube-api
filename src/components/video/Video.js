import React, { Component } from 'react';
import YouTube from 'react-youtube';

import "./Video.css";

export default class Video extends Component {
    render() {
      console.log("************************************************")
        console.log("INSIDE VIDEO.JS")
        console.log("PROPS")
        console.log(this.props)
        console.log("STATE")
        console.log(this.state)
        console.log("************************************************")
        const opts = {
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            }
        };
        return (
            <>
              <YouTube
                      videoId={this.props.videoId}
                      containerClassName={"youtubeContainer"}
                      opts={opts}
              />
              <div style={{marginTop:"-40px"}}>
                <hr style={{borderTop:"3px solid green"}}/>
                <h6><strong>{this.props.snippet.title}</strong></h6>
                <hr style={{background:"gray"}}/>
                <p><em>{this.props.snippet.channelTitle}</em></p>
                <hr style={{borderTop:"3px solid green"}}/>
              </div>
          </>    
        )
    }
}

