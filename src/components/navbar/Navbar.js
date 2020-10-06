import React from "react"

import {Link} from "react-router-dom"

const Navbar = ({handleChange,handleSubmit}) => {
    return(
        <div>
            <nav className="navbar fixed-top navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">DummyTube</Link>
                <form className="form-inline" onSubmit={handleSubmit}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
                    <Link to="/videos" ><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search Video</button></Link>
                </form>
            </nav>
        </div>
    )
}
export default Navbar