import React from 'react';
import YouTube from 'react-youtube';

import "./VideoPlayer.css";

const VideoPlayer = (props) => {
    const opts = {
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    };
    // const {title,channelTitle} = videoSnippet
    console.log(props)
    return (
        <>
          <YouTube
            videoId={props.videoId}
            containerClassName={"youtubeContainer"}
            opts={opts}
          />
          <div style={{marginTop:"-40px"}}>
            <hr style={{borderTop:"3px solid green"}}/>
            <h6><strong>{props.videoSnippet.title}</strong></h6>
            <hr style={{background:"gray"}}/>
            <p><em>{props.videoSnippet.channelTitle}</em></p>
            <hr style={{borderTop:"3px solid green"}}/>
          </div>
      </>    
    )
}
export default VideoPlayer
