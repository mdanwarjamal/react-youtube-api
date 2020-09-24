import React, {Component} from "react";

import {Link} from "react-router-dom";

class Navbar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar fixed-top navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">DummyTube</Link>
                    <form className="form-inline" onSubmit={this.props.handleSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.props.handleChange}/>
                        <Link to="/videos" ><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search Video</button></Link>
                    </form>
                </nav>
            </div>
        )
    }
}
export default Navbar;