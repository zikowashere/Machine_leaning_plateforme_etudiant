import React,{Component} from "react"
import { Route } from 'react-router-dom';

import  { Redirect } from 'react-router-dom'
import axios from "axios";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            nom:'',
            prenom:'',
            email:'',
            password:'',
            SuccessOk:false,
            error:'',
            test:[]
        };
        this.Register=this.Register.bind(this);

    }

    Register(e){
        e.preventDefault();
        let data1 = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            email: this.state.email,
            password:this.state.password
        };
        console.log("data1",data1);
        axios.post('http://localhost:4000/signUp', data1).then(res=>{
            console.log(res.data.error);
            if(res.data.status==='success'){
                this.setState({SuccessOk:true});
            }
            else{

                this.setState({
                    error: <div className="alert alert-danger" role="alert">Please check your data</div>
                });
                console.log(this.state.error);
            }


            localStorage.setItem('data4',JSON.stringify(res.data))});


    }





    render(){
        return(
           this.state.SuccessOk?
               <Route render={({ history }) => history.push("/Account")  }/> :
            <div className="row text-center" style={{ marginTop : '100px'}}>
                <div className="col-md-4"></div>
                <div className="col-md-3">
            <form class="text-center border border-light p-5" onSubmit={this.Register}>

                <p class="h4 mb-4">Sign up</p>

                <div class="form-row mb-4">
                    <div class="col">

                        <input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name"
                               onChange={(e) => this.setState({nom : e.target.value})}></input>
                    </div>
                    <div class="col">

                        <input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name"
                               onChange={(e) => this.setState({prenom : e.target.value})}></input>
                    </div>
                </div>


                <input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail"
                       onChange={(e) => this.setState({email : e.target.value})}></input>


                <input type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password"
                       aria-describedby="defaultRegisterFormPasswordHelpBlock"
                       onChange={(e) => this.setState({password : e.target.value})}
                ></input>
                        <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                            At least 8 characters and 1 digit
                        </small>


                <input type="text" id="defaultRegisterPhonePassword" class="form-control" placeholder="Phone number" aria-describedby="defaultRegisterFormPhoneHelpBlock"></input>
                            <small id="defaultRegisterFormPhoneHelpBlock" class="form-text text-muted mb-4">
                                Optional - for two step authentication
                            </small>


                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter"></input>
                                    <label class="custom-control-label" for="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
                            </div>


                            <button class="btn btn-success my-4 btn-block" type="submit" >Sign in</button>


                            <p>or sign up with:</p>

                            <a type="button" class="light-blue-text mx-2">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a type="button" class="light-blue-text mx-2">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a type="button" class="light-blue-text mx-2">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a type="button" class="light-blue-text mx-2">
                                <i class="fab fa-github"></i>
                            </a>
            </form>
                </div>
            </div>

        )
    }
}
