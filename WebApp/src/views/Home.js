import React from 'react';
import img from '../assets/img/ml.png';
import '../styles/styles.css';
import { Link } from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import axios from "axios";
import { Route } from 'react-router-dom';


/**
 * La classe générant la page d'acceuil
 */
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            SuccessOk: false,
            error: '',
            test: []
        };
        this.SignIn = this.SignIn.bind(this);

    }

    SignIn(e) {
        e.preventDefault(e);
        let data1 = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("data1", data1);
        axios.post('http://localhost:4000/signIn', data1).then(res => {
            console.log(res.data);
            if (res.data === true) {
                this.setState({SuccessOk: true});
                localStorage.setItem("data6",JSON.stringify(data1));
            } else {

                this.setState({
                    error: <div className="alert alert-danger" role="alert">Please check your data</div>
                });
                console.log(this.state.error);
            }


            localStorage.setItem('data4', JSON.stringify(res.data))
        });


    }

    render() {
        return (
            this.state.SuccessOk?
                <Route render={({ history }) => history.push("/Search")  }/> :
            <div>
                <div style={ style } className="homeDiv"></div>
                <div style={{ color: 'black', position: 'relative', top: 90, left: 450}} className="h2 col-md-6">
                    <Typography style={{color: 'white'}} variant="display1">Welcome to our Machine Learning Platform,</Typography>
                </div>
                <div style={{ color: 'white', position: 'relative', top: 90, left: 450}} className="h2 col-md-6">
                    <Typography style={{color: 'white'}} variant="display1">upload your files and see the magic worked
                        with our algorithms.</Typography>

                </div>
                <div style={{ position: 'relative', top: 190, left: 150}} className="col-md-3">
                </div>
                <div className="row text-center" style={{marginTop: '100px'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-3">
                        <form className="text-center border border-light p-5" onSubmit={this.SignIn}>

                            <p className="h4 mb-4" id="lab">Sign in</p>

                            <input type="email" id="defaultLoginFormEmail" className="form-control mb-4"
                                   placeholder="E-mail"
                                   onChange={(e) => this.setState({email: e.target.value})}></input>


                            <input type="password" id="defaultLoginFormPassword" className="form-control mb-4"
                                   placeholder="Password"
                                   onChange={(e) => this.setState({password: e.target.value})}></input>

                            <div className="d-flex justify-content-around">
                                <div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input"
                                               id="defaultLoginFormRemember"></input>
                                        <label className="custom-control-label" htmlFor="defaultLoginFormRemember" id="lab">Remember
                                            me</label>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>

                            <button className="btn btn-success btn-block my-4" type="submit" onClick={this.SignIn}>Sign
                                in
                            </button>

                            <p id="lab">Not a member?
                                <a href="/Register">Register</a>
                            </p>

                        </form>
                    </div>
                </div>
            </div>

        );
    }

}

const style = {
    position: 'absolute',
    height: "100%",
    width: "100%",
    backgroundImage: `url(${img})`,
};
