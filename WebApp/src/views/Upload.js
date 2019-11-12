
import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import createHistory from 'history/createBrowserHistory'
import Button from "@material-ui/core/Button";
import {Input, Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MDBIcon, MDBListGroup, MDBListGroupItem} from "mdbreact";
import polytechmarseille from "../Images/polytechmarseille.png"

/**
 * La classe gérant l'upload des fichiers
 * Elle permet de récupérer les fichiers et
 * de les envoyer aux serveurs
 */
export default class Upload extends Component{

    constructor(props){
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
            lrRidge:false,
            BRRidge:false,
            rfe:false,
            j48: false,
            mlp: false,
            dts:false,
            gaussien:false,
            lasso:false,
            Naves:false,
            multinavesBayes:false,
            ComplementNb:false,
            BernouilliNb:false,
            logistic:false,
            cv: false,
            showRegression:false,
            showKnnLabel:false,
            showdts:false,
            showclassification:false,
            showgaussien:false,
            showNavesAll:false,
            suggestion:false,
            click:false,
            nn:false,
            changerout:false,
            nbSplits: '',
            st:'',
            step1:'',
            step2:'',
            step3:'',
            nbSplitsShow: 'none',
            neighborsShow: 'none',
            alpharidgeShow: 'none',
            alphalassoShow: 'none',
            suggestionShow:'none',
            showNaves:'none',
            neighbors : '',
            alpharidge:'',
            alphalasso:'',
            jRedirect: false,
            pyRedirect: false,
            chart:false,
            error: '',
            pyLoading: false,
            jLoading: false,
            searchclick: false,
            ChangeToQuiz:false,
            files:[],
        };


        this.java = this.java.bind(this);
        this.python = this.python.bind(this);
        this.upload = this.upload.bind(this);
        this.toggleKNN = this.toggleKNN.bind(this);
        this.toggleNaves=this.toggleNaves.bind(this);
        this.suggestion=this.suggestion.bind(this);
        this.OpenTutoRegresssion= this.OpenTutoRegresssion.bind(this);
        this.OpenTutoKnn= this.OpenTutoKnn.bind(this);
        this.OpenTutoDTS= this.OpenTutoDTS.bind(this);
        this.Search = this.Search.bind(this);
        this.Quiz =this.Quiz.bind(this);
        this.Visualisation=this.Visualisation.bind(this);
        this.ChangeRoute=this.ChangeRoute.bind(this);

    }


    /**
     * Cette fonction renvoie vraie quand tous les algorithmes de java
     * sont sélectionnés
     * @returns {boolean}
     */
    java = () => {
        return this.state.nb || this.state.jr || this.state.rf||this.state.j48||this.state.mlp;
    };

    /**
     * La même chose pour les algos de python.
     * @returns {boolean|*}
     */
    python = () => {
        return this.state.lr || this.state.knn||this.state.lrRidge||this.state.dts||this.state.lasso|| this.state.BRRidge || this.state.gaussien|| this.state.multinavesBayes ||this.state.ComplementNb;
    };

    /**
     * La fonction faisant l'upload proprément dit
     * @param serverAddress l'adresse du serveur
     * @param data les données à envoyer
     * @param server le type de serveur (java ou python)
     */
    upload = (serverAddress, data, server) => {
        if(server === 'java') {
            //On met l'état jloading à true pour dire que on est entrain de faire appel au serveur
            //java
            this.setState({jLoading: true});
            axios.post(serverAddress, data)
                .then(res => {
                    //Dès qu'on reçoit la réponse l'état jloading dévient false.
                    this.setState({jLoading: false});
                    localStorage.setItem('data', JSON.stringify(res.data));
                    this.setState({
                        jRedirect: true,
                    });
                })
                .catch(error => {
                    this.setState({jLoading: false});
                    this.setState({
                        error: <div className="alert alert-danger" role="alert">Problème au niveau du serveur java</div>
                    });
                });
        }else{
            this.setState({pyLoading: true});
            axios.post(serverAddress, data)
                .then(res => {
                    this.setState({pyLoading: false});
                    localStorage.setItem('data2', JSON.stringify(res.data));
                    this.setState({
                        pyRedirect: true
                    });
                })
                .catch(error => {
                    this.setState({pyLoading: false});
                    this.setState({
                        error: <div className="alert alert-danger" role="alert">Problème au niveau du serveur Python</div>
                    });
                });
        }

    };
    componentDidMount() {
        console.log("props zak",this.props);
        let givendata= this.props;
        console.log("train",givendata.location.state.files[1]);
        this.setState({train:givendata.location.state.files[1]});
        this.setState({test:givendata.location.state.files[2]});
        this.setState({cv:givendata.location.state.files[3]});
        this.setState({nbSplits:givendata.location.state.files[4]});
        this.setState({showRegression: givendata.location.state.files[8]});
        this.setState({showKnnLabel: givendata.location.state.files[9]});

        console.log( "train",givendata[1]);
        localStorage.removeItem('data');
        localStorage.removeItem('data2');
        localStorage.removeItem('data4');
        localStorage.removeItem('data5');
        let givenData = JSON.parse(localStorage.getItem('data8'));
        console.log("givendata",givenData);
        this.state.showUploadAndSearch=givenData;



    }
    Search(e) {
        e.preventDefault();
        this.setState({click: true});
        console.log(this.state.click);
        let data3 = new FormData();
        data3.append("st", this.state.st);
        axios.post('http://localhost:5000/youtube', data3).then(res => {
            localStorage.setItem('data4', JSON.stringify(res.data));
            console.log(JSON.stringify(res[0]));
            this.setState({searchclick: true});
            console.log("click",this.state.searchclick);
        })
    }
    suggestion(e) {
        e.preventDefault();
        let givenData =this.props.changeit;
        console.log("test",givenData);
        this.state.train=givenData[0];
        this.state.test=givenData[1];
        this.state.cv=givenData[2];
        this.state.nbSplits=givenData[3];
        let data3 = new FormData();
        data3.append("cv", this.state.cv);
        data3.append("train",this.state.train);
        data3.append("test",this.state.test);

        if(this.state.cv)
            data3.append("nbSplits", this.state.nbSplits);
        axios.post('http://localhost:5000/suggestion',data3).then(res => {
            localStorage.setItem('data4', JSON.stringify(res.data));
            console.log("res",res.data);
            this.setState({alphalasso: res.data.alpha});
            this.setState({alpharidge: res.data.alpha});
        })
    }


    //Dès que le composant est monté, on supprime les deux cookies qui ont
    //été mis en place entre l'upload et le composant qui affiche les graphiques.
    //pour éviter des affichages érronés.




    //Pareil ici que toggleCV
    toggleKNN = (e) => {
        this.setState({knn: e.target.checked});
        if (e.target.checked)
            this.setState({neighborsShow: 'inline-block'});
        else
            this.setState({neighborsShow: 'none'});
    };
    toggleNaves = (e) => {
        this.setState({Naves: e.target.checked});
        if (e.target.checked) {
            this.setState({ShowNaves: ''});
            this.setState({showNavesAll:true});
        }
        else {
            this.setState({ShowNaves: 'none'});
            this.setState({showNavesAll:false})
        }
    };
    togglelrRidge = (e) => {
        let givendata =this.props;
        this.setState({lrRidge: e.target.checked});
        if (e.target.checked) {
            this.setState({alpharidgeShow: 'inline-block'});
            this.setState({suggestionShow: 'inline-block'});
            let givenData =this.props.changeit;
            console.log("test",givenData);
            this.state.train=givendata.location.state.files[1];
            this.state.test=givendata.location.state.files[2];
            this.state.cv=givendata.location.state.files[3];
            this.state.nbSplits=givendata.location.state.files[4];
            let data3 = new FormData();
            data3.append("cv", this.state.cv);
            data3.append("train",this.state.train);
            data3.append("test",this.state.test);
            data3.append("lasso",this.state.lasso);
            data3.append("lrRidge",this.state.lrRidge);
            if(this.state.cv)
                data3.append("nbSplits", this.state.nbSplits);
            axios.post('http://localhost:5000/suggestion',data3).then(res => {
                localStorage.setItem('data4', JSON.stringify(res.data));
                console.log("res",res.data);
                this.setState({alpharidge: res.data.alpha});
            })

        }
        else
            this.setState({alpharidgeShow: 'none'});
    };
    togglelasso = (e) => {
        let givendata =this.props;
        this.setState({lasso: e.target.checked});
        if (e.target.checked) {
            this.setState({alphalassoShow: 'inline-block'});
            this.setState({suggestionShow: 'inline-block'});
            let givenData =this.props.changeit;
            console.log("test",givenData);
            this.state.train=givendata.location.state.files[1];
            this.state.test=givendata.location.state.files[2];
            this.state.cv=givendata.location.state.files[3];
            this.state.nbSplits=givendata.location.state.files[4];
            let data3 = new FormData();
            data3.append("cv", this.state.cv);
            data3.append("train",this.state.train);
            data3.append("test",this.state.test);
            data3.append("lasso",this.state.lasso);
            data3.append("lrRidge",this.state.lrRidge);
            if(this.state.cv)
                data3.append("nbSplits", this.state.nbSplits);
            axios.post('http://localhost:5000/suggestion',data3).then(res => {
                localStorage.setItem('data4', JSON.stringify(res.data));
                console.log("res",res.data);
                this.setState({alphalasso: res.data.alpha});
            })
        }
        else
            this.setState({alphalassoShow: 'none'});
    };



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
    Quiz(){
        let email=JSON.parse(localStorage.getItem('data6')).email;
        console.log("email",email);
        this.setState({ChangeToQuiz: true});
        axios.get(`http://localhost:4000/user/${email}`).then(res=>
        localStorage.setItem("data7",JSON.stringify(res.data[0]._id))
    )
    }

    ChangeRoute(){
        this.setState({changerout:true})
    }
    Visualisation(){

        this.props.location.state.files.push(this.state.rf);
        this.props.location.state.files.push(this.state.nb);
        this.props.location.state.files.push(this.state.jr);
        this.props.location.state.files.push(this.state.j48);
        this.props.location.state.files.push(this.state.mlp);
        this.props.location.state.files.push(this.state.lr);
        this.props.location.state.files.push(this.state.knn);
        this.props.location.state.files.push(this.state.lrRidge);
        this.props.location.state.files.push(this.state.dts);
        this.props.location.state.files.push(this.state.lasso);
        this.props.location.state.files.push(this.state.BRRidge);
        this.props.location.state.files.push(this.state.gaussien);
        this.props.location.state.files.push(this.state.multinavesBayes);
        this.props.location.state.files.push(this.state.BernouilliNb);
        this.props.location.state.files.push(this.state.ComplementNb);
        this.props.location.state.files.push(this.state.neighbors);
        this.props.location.state.files.push(this.state.alphalasso);
        this.props.location.state.files.push(this.state.alpharidge);
        this.props.location.state.files.push(this.state.logistic);
        this.props.location.state.files.push(this.state.rfe);

        this.props.history.push('/chart',{files:this.props.location.state.files});
        this.setState({chart:true});
        console.log("props",this.props.location.state.files);
    }


    /**
     * La fonction qui est appelée quand le composé est monté dans le DOM
     * si au moins un des états jloading ou pyloading vaut vrai on affiche plutot
     * un progress bar de type circulaire.
     * @returns {*}
     */
    render() {
        console.log(this.props);
        return(
            this.state.changerout?
                <Route render={({history}) => history.push(`/Search`)}/> :
            this.state.pyLoading || this.state.jLoading ?
                <div className="row text-center" style={{ marginTop : '300px'}}>
                    <div className="col-md-5"></div>
                    <div className="col-md-3">
                        <CircularProgress color="secondary" style={{width: '70px'}}/>
                        <Typography variant="title">Please wait</Typography>
                    </div>
                </div> :
                this.state.jRedirect && this.state.pyRedirect || this.state.chart ?
                    <Route render={({ history }) => history.push("/chart")  }/> :
                    this.state.searchclick ?
                        <Route render={({history}) => history.push("/youtube")}/> :
                        this.state.ChangeToQuiz ?
                            <Route render={({history}) => history.push("/Quiz")}/> :
                    <div className="container">

                        <div className="row" style={{marginTop:'20px',marginLeft:'200px'}}>

                            <div className="col-md-12">

                                <ul className="stepper stepper-horizontal">



                                    <li className="completed">
                                        <a href="#!">
                                            <span className="circle">1</span>
                                            <span className="label">Choose Your Data</span>
                                        </a>
                                    </li>

                                    <li className="completed">
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


                        </div>
                        <a id= "previous" style={{marginLeft:'30px',marginTop:'3000px'}} onClick={this.ChangeRoute}  className="previous">&laquo; Previous</a>

                        <body>


                        <form onSubmit={this.Search }>

                        <div className="v1">
                            <div className="col-md-3" style={{marginLeft: '-350px'}}>
                                <div id="slide-out" className="side-nav sn-bg-4 fixed">
                                <ul className="custom-scrollbar">


                                    <div className="logo-wrapper waves-light" style={{marginTop:'-150px'}}>
                                        <a href="#"><img src={polytechmarseille}
                                                         className="img-fluid flex-center"></img></a>
                                    </div>
                                </ul>
                            </div>



                                        <ul>
                                            <MDBIcon icon="graduation-cap" className="mr-3"/>
                                            <button  id="button" className="btn btn-link" onClick={this.Quiz}>Quiz
                                            </button>
                                        </ul>

                            </div>
                                <div style={this.state.showgaussien? {marginTop:'200px'}:{display: 'none'}}>


                                </div>



                        </div>


                        </form>
                        <main>
                        </main>



                        <div className="row" >
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                {this.state.error}
                            </div>
                        </div>
                        <div className="row" style={{marginTop: '-100vh',marginRight:'-45vh'}}>
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div  className="row text-center" style={this.state.click? {marginTop : '300px'}:{display: 'none'} }>
                                    <div className="col-md-5"></div>
                                    <div className="col-md-3">
                                        <CircularProgress color="secondary" style={{width: '70px'}}/>
                                        <Typography variant="title">Please wait</Typography>
                                    </div>
                                </div>
                                <form
                                    className="text-center border border-light p-5"
                                    onSubmit={this.onSubmitFmeasure || this.onSubmit || this.onSubmitRecall ||this.suggestion}
                                    style={this.state.click? {display: 'none'}:{boxShadow: '22px 12px 22px 34px gray'}}
                                >

                                    <Typography variant="display1">Select Algorithms</Typography>
                                    <div className="col">
                                        <Typography variant="button" color="primary">Java weka algorithms</Typography>
                                    </div>
                                    <br/>
                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({rf: e.target.checked})}
                                                value="rf"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="Random Forest" color="default"/> }
                                    />
                                    </div>
                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({j48: e.target.checked})}
                                                value="j48"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="Arbre de decision" color="default"/> }
                                    />
                                    </div>
                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({nb: e.target.checked})}
                                                value="nb"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="Naive Bayes" color="default"/> }
                                    />
                                    </div>
                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({mlp: e.target.checked})}
                                                value="mlp"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="MultiLayerPerceptron" color="default"/> }
                                    />
                                    </div>
                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({jr: e.target.checked})}
                                                value="jr"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="JRip" color="default"/> }
                                    />
                                    </div>
                                    <br/>
                                    <hr/>
                                    <div className="col">
                                        <Typography variant="button" color="primary">Python SKlearn algorithms</Typography>
                                    </div>
                                    <br/>

                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{marginLeft:'200px',marginTop:'-40px'}}
                                        control={
                                            <Switch
                                                onChange={this.toggleKNN}
                                                value="knn"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="KNN" color="default"/> }
                                    />
                                    <Input
                                        placeholder="number of neighbors"
                                        style={{ display: this.state.neighborsShow }}
                                        onChange={(e) => this.setState({neighbors : e.target.value})}
                                    />
                                    </div>

                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{marginLeft:'-300px',marginTop:'-80px'}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({dts: e.target.checked})}
                                                value="dts"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="arbre de decision" color="default"/> }
                                    />
                                    </div>
                                    <div className="column">
                                        <FormControlLabel style={this.state.showRegression? {display: 'none'}:{marginLeft:'590px',marginTop:'-140px'}}
                                                          control={
                                                              <Switch
                                                                  onChange={(e) => this.setState({logistic: e.target.checked})}
                                                                  value="logistic"
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={<Chip label="logistic regression" color="default"/> }
                                        />
                                    </div>


                                    <FormControlLabel style={this.state.showRegression? {display: 'none'}:{marginLeft:'-800px',marginTop:'-130px'}}
                                                          control={
                                                              <Switch
                                                                  onChange={this.toggleNaves}
                                                                  value="Naves"
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={<Chip label="Naive Bayes" color="default"/> }
                                        />
                                        <div style={this.state.showNavesAll? {marginLeft:'-800px'}:{display: 'none'}}>
                                    <div>
                                    <FormControlLabel style={{ display: this.state.ShowNaves}}
                                                      control={
                                                          <Switch
                                                              onChange={(e) => this.setState({gaussien: e.target.checked})}
                                                              value="gaussien"
                                                              color="primary"
                                                          />
                                                      }
                                                      label={<Chip label="Gaussien naive baise" color="default"/> }
                                    />
                                    </div>
                                    <div>
                                    <FormControlLabel style={{ display: this.state.ShowNaves}}
                                                      control={
                                                          <Switch
                                                              onChange={(e) => this.setState({multinavesBayes: e.target.checked})}
                                                              value="mutinavesBayes"
                                                              color="primary"
                                                          />
                                                      }
                                                      label={<Chip label="mutinavesBayes" color="default"/> }
                                    />
                            </div>

                                    <div>
                                        <FormControlLabel style={{ display: this.state.ShowNaves}}
                                                          control={
                                                              <Switch
                                                                  onChange={(e) => this.setState({ BernouilliNb: e.target.checked})}
                                                                  value=" BernouilliNb"
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={<Chip label="BernouilliNb" color="default"/> }
                                        />
                                    </div>
                                    <div>
                                        <FormControlLabel style={{ display: this.state.ShowNaves}}
                                                          control={
                                                              <Switch
                                                                  onChange={(e) => this.setState({ ComplementNb: e.target.checked})}
                                                                  value=" ComplementNb"
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={<Chip label="ComplementNb" color="default"/> }
                                        />
                                    </div>
                                        </div>


                                    <div className="column">
                                    <FormControlLabel style={this.state.showRegression? {}:{display: 'none'}}
                                        control={
                                            <Switch
                                                onChange={this.togglelrRidge}
                                                value="lrRidge"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="linear Ridge" color="default"/> }
                                    />
                                        <Input
                                            placeholder="alpharidge"
                                            style={{ display: this.state.alpharidgeShow }}
                                            onChange={(e) => this.setState({alpharidge : e.target.value})}
                                            value={this.state.alpharidge}
                                        />
                                    </div>
                                        <div className="column">
                                            <FormControlLabel style={this.state.showRegression? {}:{display: 'none'}}
                                                              control={
                                                                  <Switch
                                                                      onChange={this.togglelasso }
                                                                      value="lasso"
                                                                      color="primary"
                                                                  />
                                                              }
                                                              label={<Chip label="lasso" color="default"/> }
                                            />
                                    <Input
                                        placeholder="alphalasso"
                                        style={{ display: this.state.alphalassoShow }}
                                        onChange={(e) => this.setState({alphalasso : e.target.value})}
                                        value={this.state.alphalasso}
                                    />
                                    </div>

                                    <div>
                                        <FormControlLabel style={this.state.showRegression? {}:{display: 'none'}}
                                                          control={
                                                              <Switch
                                                                  onChange={(e) => this.setState({BRRidge: e.target.checked})}
                                                                  value="BRRidge"
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={<Chip label="Bayesien Regression Ridge" color="default"/> }
                                        />
                                    </div>
                                    <div>
                                    <FormControlLabel style={this.state.showRegression? {}:{display: 'none'}}
                                        control={
                                            <Switch
                                                onChange={(e) => this.setState({lr: e.target.checked})}
                                                value="lr"
                                                color="primary"
                                            />
                                        }
                                        label={<Chip label="Linear Regression" color="default"/> }
                                    />
                                    </div>
                                    <div>
                                        <FormControlLabel style={this.state.showRegression? {}:{display: 'none'}}
                                                          control={
                                                              <Switch
                                                                  onChange={(e) => this.setState({rfe: e.target.checked})}
                                                                  value="rfe"
                                                                  color="primary"
                                                              />
                                                          }
                                                          label={<Chip label="rfe" color="default"/> }
                                        />
                                    </div>
                                    <hr/>


                                    <br/>
                                    <button
                                        className="btn btn-info my-4"
                                        type="submit" onClick={this.Visualisation}>
                                        Visualisation
                                    </button>
                                </form>
                            </div>
                        </div>
                        </body>
                    </div>



        );
    }

}

