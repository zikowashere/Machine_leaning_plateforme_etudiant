import React, {Component} from "react";
import { Route } from 'react-router-dom';
import axios from "axios";

export default class Account extends Component {
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
            <div className="row text-center" style={{marginTop: '100px'}}>
                <div className="col-md-4"></div>
                <div className="col-md-3">
                    <form class="text-center border border-light p-5" onSubmit={this.SignIn}>

                        <p class="h4 mb-4">Sign in</p>

                        <input type="email" id="defaultLoginFormEmail" class="form-control mb-4"
                               placeholder="E-mail"
                               onChange={(e)=>this.setState({email :e.target.value})}></input>


                        <input type="password" id="defaultLoginFormPassword" class="form-control mb-4"
                               placeholder="Password"
                               onChange={(e)=>this.setState({password :e.target.value})}></input>

                        <div class="d-flex justify-content-around">
                            <div>
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input"
                                           id="defaultLoginFormRemember"></input>
                                    <label class="custom-control-label" for="defaultLoginFormRemember">Remember
                                        me</label>
                                </div>
                            </div>
                            <div>
                                <a href="">Forgot password?</a>
                            </div>
                        </div>

                        <button class="btn btn-success btn-block my-4" type="submit" onClick={this.SignIn}>Sign in</button>

                        <p>Not a member?
                            <a href="/Register">Register</a>
                        </p>
                        <p>or sign in with:</p>
                        <a  href="/Authentification" type="button" class="light-blue-text mx-2">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="/Authentification" type="button" class="light-blue-text mx-2">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="/Authentification" type="button" class="light-blue-text mx-2">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="/Authentification" type="button" class="light-blue-text mx-2">
                            <i class="fab fa-github"></i>
                        </a>

                    </form>
                </div>
            </div>


        )
    }

}
