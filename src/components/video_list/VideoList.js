import React from 'react'

import {Grid,Row,Col} from "react-flexbox-grid"

const VideoList = ({videoId,videoSnippet,handleVideoSelection}) => {
    const handleClick=()=>{
        var vidId=videoId;
        var vidSnippet=videoSnippet;
        handleVideoSelection(vidId,vidSnippet);
    }
    // const {description,title,channelTitle} = videoSnippet
    const url = videoSnippet.thumbnails.high.url
    return (
        <Grid>
            <Row onClick={handleClick}>
                <Col xs={6}>
                <img src={url} className="card-img-top" alt={videoSnippet.description} />
                </Col>
                <Col xs={6} >
                    <h6>{videoSnippet.title}</h6>
                    <hr />
                    <small>{videoSnippet.channelTitle}</small>
                </Col>
            </Row>
            <hr/>
        </Grid>    
    )
}
export default VideoList