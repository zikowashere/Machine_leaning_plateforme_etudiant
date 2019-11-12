import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Typography} from "@material-ui/core";

/**
 * La page de navigation
 */
export default class Nav extends Component{

    render() {
        return(
            <nav className="mb-1 navbar fixed-top navbar-expand-lg navbar-dark black" id="navbarpr">
                <a className="navbar-brand" href="/"><Typography variant="display1" style={{fontSize: '1.2em', color: 'white'}}> MachineLearningPlatform</Typography></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
                        aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                <Typography variant="display1" style={{fontSize: '1.2em', color: 'white'}}>Home</Typography>
                            </Link>
                        </li>
                    </ul>
                </div>
                <li className="nav-item dropdown" style={{fontSize: '1em', color: 'white'}}>
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-user"></i> Profile </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-info"
                         aria-labelledby="navbarDropdownMenuLink-4">
                        <a className="dropdown-item" href="/Account">My account</a>
                        <a className="dropdown-item" href="/Account">Log out</a>
                    </div>
                </li>

            </nav>

        );


    }

}
