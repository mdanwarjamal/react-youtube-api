import React, { Component } from 'react';

import {Grid,Row,Col} from "react-flexbox-grid";

export default class VideoList extends Component {
    handleClick=()=>{
        var vidId=this.props.id;
        var vidSnippet=this.props.snippet;
        this.props.handleVideoSelection(vidId,vidSnippet);
    }
    render() {
        console.log("************************************************")
        console.log("INSIDE VIDEOLIST.JS")
        console.log("PROPS")
        console.log(this.props)
        console.log("STATE")
        console.log(this.state)
        console.log("************************************************")
        return (
            <Grid>
                <Row onClick={this.handleClick}>
                    <Col xs={6}>
                    <img src={this.props.snippet.thumbnails.high.url} className="card-img-top" alt={this.props.snippet.description} />
                    </Col>
                    <Col xs={6} >
                        <h6>{this.props.snippet.title}</h6>
                        <hr />
                        <small>{this.props.snippet.channelTitle}</small>
                    </Col>
                </Row>
                <hr/>
            </Grid>    
        )
    }
}
