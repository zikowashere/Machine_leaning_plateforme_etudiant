import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import {Input, Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Upload from "./Upload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import StepperML from "./StepperML";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import polytechmarseille from "../Images/polytechmarseille.png"




export default class Search extends Component {

    constructor(props) {
        super(props);
        //Définition des variables d'état.
        this.state = {
            train: null,
            test: null,
            testShow: 'inline-block',
            rf: false,
            nb: false,
            jr: false,
            knn: false,
            lr: false,
            lrRidge: false,
            gaussien:false,
            j48: false,
            mlp: false,
            dts: false,
            cv: false,
            route: false,
            showUpload: false,
            showSearch: false,
            showRegression:false,
            showKnnLabel:false,
            showSystem:false,
            showdts:false,
            showgaussien:false,
            showKnn:false,
            showData:true,
            showAlgo:true,
            showUploadAndSearch: false,
            ChooseAlgo: false,
            nbSplits: '',
            st: '',
            step1:'',
            step2:'',
            step3:'',
            nbSplitsShow: 'none',
            neighborsShow: 'none',
            alphaShow: 'none',
            neighbors: '',
            alpha: '',
            jRedirect: false,
            pyRedirect: false,
            wait:false,
            regressionClick:false,
            error: '',
            pyLoading: false,
            jLoading: false,
            searchclick: false,
            files: [],
            Step:[]
        };

        this.Search = this.Search.bind(this);
        this.ChangeRoute = this.ChangeRoute.bind(this);
        this.toggleCV = this.toggleCV.bind(this);
        this.ChangeStepRegression= this.ChangeStepRegression.bind(this);
        this.ChangeStepKnn= this.ChangeStepKnn.bind(this);
        this.ChangeStepdts= this.ChangeStepdts.bind(this);
        this.OpenTutoRegresssion= this.OpenTutoRegresssion.bind(this);
        this.OpenTutoKnn= this.OpenTutoKnn.bind(this)
        this.OpenTutoDTS= this.OpenTutoDTS.bind(this);
        this.AlgoShow= this.AlgoShow.bind(this);
    }


    Search(e) {
        e.preventDefault();
        this.setState({click:true});
        console.log("howaoaoja",this.state.click);
        let data3 = new FormData();
        data3.append("st", this.state.st);
        axios.post('http://localhost:5000/youtube', data3).then(res => {
            localStorage.setItem('data4', JSON.stringify(res.data));
            console.log(JSON.stringify(res[0]));
            this.setState({searchclick: true});
            console.log("click",this.state.searchclick);
        })
    }
    /**
     * Quand on clique sur le switch de cross validation
     * cette fontion est appelée pour faire apparaître la case ou mettre le nombre
     * de splits et cacher l'input de fichier test
     * @param e
     */
    toggleCV = (e) => {
        this.setState({cv: e.target.checked});
        if (e.target.checked)
            this.setState({nbSplitsShow: 'inline-block', testShow: 'none'});
        else
            this.setState({nbSplitsShow: 'none', testShow: 'inline-block'});
    };

    ChangeRoute(e) {
        e.preventDefault();
        this.setState({showUpload: true});
        this.setState({showSearch: true});
        this.setState({showUploadAndSearch: false});
        this.setState({showData: true});
        this.setState({showSystem: true});
        this.state.files.push(this.state.step2);
        console.log("step2",this.state.step2);




    }
    AlgoShow(e){
        e.preventDefault();

        this.setState({step1:"completed"});
        this.setState({step2:" "});
        this.state.Step.push(this.state.ChooseAlgo);
        this.setState({showData:false});
        console.log("step",this.state.ChooseAlgo);
    }
    ChangeStepRegression(e) {
        e.preventDefault();
        this.setState({step1: "completed"});
        this.setState({step2: "active"});
        this.state.files.push(this.state.train);
        this.state.files.push(this.state.test);
        this.state.files.push(this.state.cv);
        this.state.files.push(this.state.nbSplits);
        this.state.files.push(this.state.showSearch);
        this.state.files.push(this.state.showUpload);
        this.state.files.push(this.state.showUploadAndSearch);
        this.state.files.push(true);
        this.state.files.push(true);

        this.setState({showUploadAndSearch: true});
        if (this.state.train === null || (!this.state.cv && this.state.test === null)) {
            this.setState({step1: ""});
            this.setState({step2: ""});
            this.setState({showUploadAndSearch: false});
            this.setState({
                error: <div style={{marginTop: '-800px'}} className="alert alert-danger" role="alert">Please select your
                    train and test file</div>
            });
            window.location.reload();
        } else {
            //this.setState({showUploadAndSearch:true});
            this.props.history.push('/upload', {files: this.state.files});
        }
    }
    ChangeStepKnn(e){
        e.preventDefault();
        this.state.files.push(this.state.train);
        this.state.files.push(this.state.test);
        this.state.files.push(this.state.cv);
        this.state.files.push(this.state.nbSplits);
        this.state.files.push(this.state.showSearch);
        this.state.files.push(this.state.showUpload);
        this.state.files.push(this.state.showUploadAndSearch);
        this.state.files.push(this.state.showRegression);
        this.state.files.push(true);
        this.setState({step1:"completed"});
        this.setState({step2:"active"});
        this.state.Step.push(this.state.ChooseAlgo);
        this.setState({showKnnLabel: true}) ;
        if(this.state.train === null || (!this.state.cv && this.state.test === null)) {
            this.setState({step1: ""});
            this.setState({step2: ""});
                this.setState({showUploadAndSearch: false});
            this.setState({
                error: <div  style={{marginTop:'-800px'}} className="alert alert-danger" role="alert">Please select your train and test file</div>
            });
            window.location.reload();
        }
        else
        {
            //this.setState({showUploadAndSearch:true});
            this.props.history.push('/upload',{files:this.state.files});
        }
        //

        console.log("step",this.state.ChooseAlgo);
    }
    ChangeStepdts(e){
        e.preventDefault();
        this.setState({step1:"completed"});
        this.setState({step2:"active"});
        this.state.files.push(this.state.train);
        this.state.files.push(this.state.test);
        this.state.files.push(this.state.cv);
        this.state.files.push(this.state.nbSplits);
        this.state.files.push(this.state.showSearch);
        this.state.files.push(this.state.showUpload);
        this.state.files.push(this.state.showUploadAndSearch);
        this.state.files.push(false);
        this.state.files.push(this.state.showKnnLabel);
        this.state.files.push(true);
        this.setState({showUploadAndSearch:true});
        this.state.Step.push(this.state.ChooseAlgo);
        this.setState({showUploadAndSearch:true});
        if(this.state.train === null || (!this.state.cv && this.state.test === null))
            this.setState({showUploadAndSearch: false});
        this.setState({
            error: <div  style={{marginTop:'-800px'}} className="alert alert-danger" role="alert">Please select your train and test file</div>
        });
        this.props.history.push('/upload',{files:this.state.files});
    }
    OpenTutoRegresssion(){
        console.log("open");
        window.open("http://localhost:8888/notebooks/regression-lineaire.ipynb");
    }
    OpenTutoKnn(){
        window.open("http://localhost:8888/notebooks/knn-for-classification-using-scikit-learn.ipynb");
    }
    OpenTutoDTS(){
        window.open("http://localhost:8888/notebooks/introduction-to-decision-trees-titanic-dataset.ipynb")
    }



    //this.setState({ route: true });

    componentDidMount() {
        this.state.showSearch = true;
        console.log("train",this.state.train);
        localStorage.removeItem('data');
        localStorage.removeItem('data2');
        localStorage.removeItem('data4');
        localStorage.removeItem('data5');


    }


    render() {
        return (


            this.state.route ?
                <Route render={({history}) => history.push(`/upload`)}/> :
                this.state.searchclick ?
                    <Route render={({history}) => history.push("/youtube")}/> :
                    this.state.showUploadAndSearch ?
                        <Route render={({history}) => history.push("/upload")}/> :

                    <div className="container">
                       <body>
                       <form onSubmit={this.Search }>
                        <header style={this.state.showUploadAndSearch ?  {display: 'none'}:{} }>

                                <div className="column">
                                    <div className="col-md-3"></div>
                                        <div
                                            style={{marginTop:'20px',marginLeft:'100px'}}>




                                            <ul className="stepper stepper-horizontal">


                                                <li className="completed">
                                                    <a href="#!">
                                                        <span className="circle">1</span>
                                                        <span className="label">Choose Your Data</span>
                                                    </a>
                                                </li>
                                                <li className={this.state.step2}>
                                                    <a href="#!">
                                                        <span className="circle">2</span>
                                                        <span className="label">Choose Your Algo</span>
                                                    </a>
                                                </li>

                                                <li className={this.state.step3}>
                                                    <a href="#!">
                                                        <span className="circle">3</span>
                                                        <span className="label">Visualisation</span>
                                                    </a>
                                                </li>




                                            </ul>




                                </div>
                                    <div className="v1">
                                <div className="col-md-12" style={{marginLeft: '-460px'}} >
                                    <div id="slide-out" className="side-nav sn-bg-4 fixed"id="nav-bar-ino">
                                        <ul className="custom-scrollbar">

                                        <div className="logo-wrapper waves-light" style={{marginTop:'-150px'}}>
                                            <a href="#"><img src ={polytechmarseille}
                                                             className="img-fluid flex-center"></img></a>
                                        </div>

                                    <ul style={{marginTop:'50px'} }>
                                     <li>

                                        <button type="submit" className="btn btn-link"
                                                onClick={this.AlgoShow}><i
                                        ></i> <MDBIcon icon="table" className="mr-3"/>choose data<i
                                        ></i></button>
                                     </li>
                                    </ul>


                                            <ul>
                                                <li>
                                                    <MDBListGroup id="group" className="list-group-flush">
                                                        <MDBListGroupItem id="group" className="mr-3">
                                                            <MDBIcon icon="code" className="mr-3"/>Regression
                                                            <a  href="#pageSubmenu29" data-toggle="collapse"
                                                               aria-expanded="false"
                                                               className="fas fa-chevron-down"
                                                               style={{marginLeft: '3vh', marginTop: '-vh'}}></a>
                                                                        <ul className="collapse list-unstyled" id="pageSubmenu29">
                                                                            <MDBListGroup  id= "group" className="list-group-flush">
                                                                                <MDBListGroupItem  id= "group" className="mr-3" >
                                                                                    <MDBIcon icon="eye" className="mr-3"/>See video
                                                                                    <a href="#pageSubmenu41" data-toggle="collapse" aria-expanded="false"
                                                                                       class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                                                    <ul className="collapse list-unstyled" id="pageSubmenu41">
                                                                                        <li>
                                                                                            <button style={{marginLeft:"50px"}}  id="button" className="btn btn-link" onClick={()=>this.setState({st:'Linear Regression'})}> Linear Regression
                                                                                            </button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <button style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={()=>this.setState({st:'Linear Regression Ridge'})}> Linear regression Ridge
                                                                                            </button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <button style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={()=>this.setState({st:'Linear regression Lasso'})}> Linear regression Lasso
                                                                                            </button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </MDBListGroupItem>
                                                                            </MDBListGroup>
                                                                            <MDBListGroup  id= "group" className="list-group-flush">
                                                                                <MDBListGroupItem  id= "group" className="mr-3" >
                                                                                    <MDBIcon icon="graduation-cap" className="mr-3"/>Tutorials
                                                                                    <a href="#pageSubmenu42" data-toggle="collapse" aria-expanded="false"
                                                                                       class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                                                    <ul className="collapse list-unstyled" id="pageSubmenu42">

                                                                                        <li>
                                                                                            <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoKnn}>Linear Regression
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoDTS}>Linear regression Ridge
                                                                                            </a>
                                                                                        </li>
                                                                                        <li>
                                                                                            <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoDTS}>Linear regression Lasso
                                                                                            </a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </MDBListGroupItem>
                                                                                <ul style={{marginLeft:"-17px"}}>
                                                                                <MDBIcon icon="graduation-cap" className="mr-3" />

                                                                                <button  onClick={this.ChangeStepRegression} style={{marginLeft:"3px"}}  className="btn btn-link" > Algorithms

                                                                                </button></ul>

                                                                            </MDBListGroup>

                                                                        </ul>

                                                        </MDBListGroupItem>
                                                    </MDBListGroup>





                                                </li>
                                            </ul>

                                            <ul>
                                                <li>
                                            <MDBListGroup  id= "group" className="list-group-flush">
                                                <MDBListGroupItem  id= "group" className="mr-3" >
                                                    <MDBIcon icon="code" className="mr-3"/>Classification
                                                    <a   href="#pageSubmenu22" data-toggle="collapse" aria-expanded="false"
                                                         class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                    <ul className="collapse list-unstyled" id="pageSubmenu22">
                                                        <MDBListGroup  id= "group" className="list-gro</MDBListGroupItem>up-flush">
                                                    <MDBListGroup  id= "group" className="list-group-flush">

                                                        <MDBListGroupItem  id= "group" className="mr-3" >
                                                            <MDBIcon icon="graduation-cap" className="mr-3"/>NaivesBayes
                                                            <a   href="#pageSubmenu21" data-toggle="collapse" aria-expanded="false"
                                                                 class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                            <ul className="collapse list-unstyled" id="pageSubmenu21">
                                                                <MDBListGroup  id= "group" className="list-group-flush">


                                                                </MDBListGroup>
                                                                <MDBListGroup  id= "group" className="list-group-flush">
                                                                    <MDBListGroupItem  id= "group" className="mr-3" >
                                                                        <MDBIcon icon="eye" className="mr-3"/>See video
                                                                        <a href="#pageSubmenu32" data-toggle="collapse" aria-expanded="false"
                                                                           class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                                        <ul className="collapse list-unstyled" id="pageSubmenu32">
                                                                            <li>
                                                                                <button style={{marginLeft:"50px"}}  id="button" className="btn btn-link" onClick={()=>this.setState({st:'Gaussien naives bayes'})}> Gaussien Naives Bayes
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={()=>this.setState({st:'Multinomial naives bayes'})}> Multinomial Naives Bayes
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={()=>this.setState({st:'Bernouilli naives bayes'})}> Bernouilli Naives Bayes
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <button style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={()=>this.setState({st:'Complement naives bayes'})}> Complement Naives Bayes
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </MDBListGroupItem>
                                                                </MDBListGroup>
                                                                <MDBListGroup  id= "group" className="list-group-flush">
                                                                    <MDBListGroupItem  id= "group" className="mr-3" >
                                                                        <MDBIcon icon="graduation-cap" className="mr-3"/>Tutorials
                                                                        <a href="#pageSubmenu33" data-toggle="collapse" aria-expanded="false"
                                                                           class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                                        <ul className="collapse list-unstyled" id="pageSubmenu33">

                                                                            <li>
                                                                                <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoKnn}>Tuto Gaussien naives Bayes
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoDTS}>Multinomial Naives Bayes
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoDTS}>Bernouilli Naives Bayes
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoDTS}>Complement Naives Bayes
                                                                                </a>
                                                                            </li>

                                                                        </ul>
                                                                    </MDBListGroupItem>
                                                                </MDBListGroup>

                                                            </ul>
                                                        </MDBListGroupItem>
                                                    </MDBListGroup>
                                                            <MDBListGroup  id= "group" className="list-group-flush">
                                                                <MDBListGroupItem  id= "group" className="mr-3"  >
                                                                    <MDBIcon icon="graduation-cap" className="mr-3"/>Near Neighbors
                                                                    <a   href="#pageSubmenu26" data-toggle="collapse" aria-expanded="false"
                                                                         class="fas fa-chevron-down" style={{marginLeft:'2vh',marginTop:'-vh'}} ></a>
                                                                    <ul className="collapse list-unstyled" id="pageSubmenu26">
                                                                        <MDBListGroup  id= "group" className="list-group-flush">
                                                                            <MDBListGroup  id= "group" className="list-group-flush">
                                                                                <MDBListGroupItem  id= "group" className="mr-3" >
                                                                                    <MDBIcon icon="eye" className="mr-3"/>See video
                                                                                    <a href="#pageSubmenu44" data-toggle="collapse" aria-expanded="false"
                                                                                       class="fas fa-chevron-down"  ></a>
                                                                                    <ul className="collapse list-unstyled" id="pageSubmenu44">
                                                                                        <li>
                                                                                            <button style={{marginLeft:"50px"}}  id="button" className="btn btn-link" onClick={()=>this.setState({st:'K-nearest neighbors'})}> K-nearest neighbors
                                                                                            </button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </MDBListGroupItem>
                                                                            </MDBListGroup>
                                                                            <MDBListGroup  id= "group" className="list-group-flush">
                                                                                <MDBListGroupItem  id= "group" className="mr-3" >
                                                                                    <MDBIcon icon="graduation-cap" className="mr-3"/>Tutorials
                                                                                    <a href="#pageSubmenu45" data-toggle="collapse" aria-expanded="false"
                                                                                       class="fas fa-chevron-down" style={{marginLeft:'3vh',marginTop:'-vh'}} ></a>
                                                                                    <ul className="collapse list-unstyled" id="pageSubmenu45">

                                                                                        <li>
                                                                                            <a style={{marginLeft:"50px"}} id="button" className="btn btn-link" onClick={this.OpenTutoKnn}>K-nearest neighbors
                                                                                            </a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </MDBListGroupItem>
                                                                            </MDBListGroup>
                                                                        </MDBListGroup>
                                                                    </ul>
                                                                </MDBListGroupItem>
                                                            </MDBListGroup>
                                                            <ul style={{marginLeft:"-17px"}}>
                                                                <MDBIcon icon="graduation-cap" className="mr-3" />

                                                                <button  onClick={this.ChangeStepKnn} style={{marginLeft:"3px"}}  className="btn btn-link" > Algorithms

                                                                </button></ul>
                                                        </MDBListGroup>
                                                    </ul>
                                                </MDBListGroupItem>
                                            </MDBListGroup>
                                                </li>
                                            </ul>





                                            </ul>
                                                </div>

                                    </div>
                                </div>
                            </div>
                        </header>


                           <div  className="row text-center" style={this.state.click? {marginTop : '-500px'}:{display: 'none'} }>
                               <div className="col-md-5"></div>
                               <div className="col-md-3">
                                   <CircularProgress color="secondary" style={{width: '70px'}}/>
                                   <Typography variant="title">Please wait</Typography>
                               </div>
                           </div>

                       </form>
                        <main>


                        </main>



                        <div className="row">
                            <div className="col-md-9 "></div>
                            <div className="col-md-6">
                                {this.state.error}

                            </div>

                        </div>



                        <div className="row"
                             style={this.state.showUploadAndSearch || this.state.showData || this.state.click?  {display: 'none'} : {marginTop: '-600px',marginLeft:'70px'}}>
                            <div className="col-md-2"></div>

                            <div className="col-md-2" style={{marginTop: '-700px',marginRight:'100px'}}></div>
                            <div className="col-md-8">


                                <form className="form-inline md-form form-sm active-pink active-pink-2 mt-2"
                                      style={{box: '30px 100px 100px 100px gray'}}
                                      onSubmit={this.ChangeRoute|| this.Search} >


                                    <div className="row" style={{marginLeft: '170px', marginTop: '-90px'}}>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-10">

                                            <FormControlLabel
                                                style={{marginTop: '-10px'}}
                                                control={
                                                    <Switch
                                                        onChange={this.toggleCV}
                                                        value="cv"
                                                        color="secondary"
                                                    />
                                                }
                                                label={<Chip label="Cross Validation ?" color="black"/>}
                                            />
                                            <div className="col" style={{marginLeft:'200px',marginTop:'0px'}} >
                                                <Input
                                                    placeholder="number of splits = 10"
                                                    style={{display: this.state.nbSplitsShow}}
                                                    onChange={(e) => this.setState({nbSplits: e.target.value})}
                                                />
                                            </div>
                                            <br/>
                                            <br/>
                                            <hr/>
                                            <div id="br"  style={{
                                                marginLeft: '-100px',
                                            }}>



                                                <br/>


                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span><i
                                                        className="fas fa-cloud-upload-alt mr-2" aria-hidden="true" style={{marginLeft: '-60px',marginTop:'25px'}}></i>Train files</span>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input type="file"  multiple class="custom-file-input" id="customFileLang" onChange={(e) => this.setState({train: e.target.files[0]})} />
                                                        <label className="custom-file-label"
                                                               htmlFor="inputGroupFile01" style={{marginRight: '-200px'}} ></label>

                                                    </div>
                                                </div>


                                                <br/>
                                                <div className="input-group">
                                                         <span style={{display: this.state.testShow}}><i
                                                             className="fas fa-cloud-upload-alt mr-2" aria-hidden="true" style={{marginLeft: '-58px',marginTop:'25px',display: this.state.testShow}}></i>Test files</span>
                                                    <div className="custom-file">

                                                        <input type="file" className="custom-file-input"
                                                               aria-describedby="inputGroupFileAddon01" onChange={(e) => this.setState({test: e.target.files[0]})}/>
                                                        <label className="custom-file-label"
                                                               htmlFor="inputGroupFile01" style={{marginRight: '-200px',display: this.state.testShow}}></label>

                                                    </div>
                                                </div>
                                                <button

                                                    style={{marginLeft: '200px'}}
                                                    type="submit" onClick={this.ChangeRoute} >
                                                    Upload
                                                </button>


                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>


                       </body>
                    </div>
        )
    }
}










