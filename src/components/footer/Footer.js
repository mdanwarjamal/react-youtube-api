import React, {Component} from "react";
import "./Footer.css";

class Footer extends Component{
    render(){
        return(
            <nav className="navbar fixed-bottom navbar-dark bg-dark">
               <div className="footer-content">
                Copyright &copy; - DummyTube. All Rights Reserved | Contact Us: +91 98777 98777
               </div>
            </nav>
        )
    }
}
export default Footer;