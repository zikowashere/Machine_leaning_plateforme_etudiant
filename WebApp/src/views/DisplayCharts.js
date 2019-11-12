
import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from "axios";
import { Route } from 'react-router-dom';
import {MDBIcon} from "mdbreact";

/**
 * La classe qui va permettre d'afficher les graphiques.
 */
export default class DisplayCharts extends Component {

    constructor(props){
        super(props);

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
            j48: false,
            mlp: false,
            dts:false,
            gaussien:false,
            changeRout:false,
            lasso:false,
            cv: false,
            error: '',
            alpharidge:'',
            alphalasso:'',
            neighbors : '',
            files:[],
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                    xAxes: [{
                        barThickness : 100
                    }]
                }
            },
            data : []
        };
        this.onSubmit=this.onSubmit.bind(this);
        this.onSubmitFmeasure=this.onSubmitFmeasure.bind(this);
        this.upload = this.upload.bind(this);
        this.java = this.java.bind(this);
        this.python = this.python.bind(this);
        this.onSubmitRecall = this.onSubmitRecall.bind(this);
        this.ChangeRoute= this.ChangeRoute.bind(this);
        //this.visualisation=this.visualisation.bind(this);

    }
    java = () => {
        return this.state.nb || this.state.jr || this.state.rf||this.state.j48||this.state.mlp;
    };

    /**
     * La même chose pour les algos de python.
     * @returns {boolean|*}
     */
    python = () => {
        return this.state.lr || this.state.knn||this.state.lrRidge||this.state.dts||this.state.lasso|| this.state.BRRidge || this.state.gaussien|| this.state.multinavesBayes ||this.state.ComplementNb || this.state.nn;
    };
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
                    this.componentDidMount();
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
                    this.componentDidMount();
                })
                .catch(error => {
                    this.setState({pyLoading: false});
                    this.setState({
                        error: <div className="alert alert-danger" role="alert">Problème au niveau du serveur Python</div>
                    });
                });
        }

    };
    onSubmit(e) {
        e.preventDefault();
        let givendata =this.props;
        console.log("props",this.props);
        this.state.train=givendata.location.state.files[1];
        this.state.test=givendata.location.state.files[2];
        this.state.cv=givendata.location.state.files[3];
        this.state.rf=givendata.location.state.files[10];
        this.state.nb=givendata.location.state.files[11];
        this.state.jr=givendata.location.state.files[12];
        this.state.j48=givendata.location.state.files[13];
        this.state.mlp=givendata.location.state.files[14];
        this.state.lr=givendata.location.state.files[15];
        this.state.knn=givendata.location.state.files[16];
        this.state.lrRidge=givendata.location.state.files[17];
        this.state.dts=givendata.location.state.files[18];
        this.state.lasso=givendata.location.state.files[19];
        this.state.BRRidge=givendata.location.state.files[20];
        this.state.gaussien=givendata.location.state.files[21];
        this.state.multinavesBayes=givendata.location.state.files[22];
        this.state.BernouilliNb=givendata.location.state.files[23];
        this.state.ComplementNb=givendata.location.state.files[24];
        this.state.neighbors=givendata.location.state.files[25];
        this.state.alphalasso=givendata.location.state.files[26];
        this.state.alpharidge=givendata.location.state.files[27];
        this.state.logistic=givendata.location.state.files[28];
        this.state.rfe=givendata.location.state.files[29];

        //Validation de données
        if(this.state.train === null || (!this.state.cv && this.state.test === null))
            this.setState({
                error: <div className="alert alert-danger" role="alert">Please select your train and test file</div>
            });
        else if(!this.state.rf && !this.state.nb && !this.state.jr && !this.state.j48 && !this.state.mlp && !this.state.lr && !this.state.knn && !this.state.lrRidge && !this.state.dts &&!this.state.lasso &&!this.state.BRRidge &&!this.state.gaussien &&!this.state.multinavesBayes && !this.state.BernouilliNb && !this.state.ComplementNb && !this.state.nn  && !this.state.logistic && !this.state.rfe)
            this.setState({
                error: <div className="alert alert-danger" role="alert">Please select at least one algorithm</div>
            });
        else {
            let data2 = new FormData();
            let data1 = new FormData();

            data1.append('train', givendata.location.state.files[1]);
            data1.append('test', givendata.location.state.files[2]);
            data1.append('rf', this.state.rf);
            data1.append('nb', this.state.nb);
            data1.append('jr',this.state.jr);
            data1.append('j48',this.state.j48);
            data1.append('mlp',this.state.mlp);
            data1.append('cv', givendata.location.state.files[3]);




            if(givendata.location.state.files[4] !== '')
                data1.append("nbSplits",givendata.location.state.files[4]);

            data2.append('train', givendata.location.state.files[1]);
            data2.append('test', givendata.location.state.files[2]);
            data2.append('lr', this.state.lr);
            data2.append('knn', this.state.knn);
            data2.append('lrRidge',this.state.lrRidge);
            data2.append('dts',this.state.dts);
            data2.append('lasso',this.state.lasso);
            data2.append('BRRidge',this.state.BRRidge);
            data2.append('gaussien',this.state.gaussien);
            data2.append('multinavesBayes',this.state.multinavesBayes);
            data2.append('BernouilliNb',this.state.BernouilliNb);
            data2.append('ComplementNb',this.state.ComplementNb);
            data2.append('logistic',this.state.logistic);
            data2.append('rfe',this.state.rfe);


            data2.append('cv', givendata.location.state.files[3]);


            if(this.state.cv===true)
                console.log(givendata.location.state.files[3]);
            data2.append("nbSplits", givendata.location.state.files[4]);
            if(this.state.knn)
                data2.append("neighbors", this.state.neighbors);
            if(this.state.lrRidge)
                data2.append("alpharidge", givendata.location.state.files[25]);
            if(this.state.lasso) {
                data2.append("alphalasso", givendata.location.state.files[26]);
                console.log("alphalasso",this.state.alphalasso);
            }
            //Si on a que des algos de java qui sont sélectionnés
            if (this.java() && !this.python()) {
                this.upload('http://localhost:8080/upload', data1, 'java');
                this.setState({pyRedirect: true});
                //this.componentDidMount();


                // que les algos de python
            } else if (!this.java() && this.python()) {
                this.upload('http://localhost:5000/upload', data2, 'python');
                this.setState({jRedirect: true});

                //au moins 1 algo sélectionné des deux côtés.
            } else {
                this.upload('http://localhost:5000/upload', data2, 'python');
                this.upload('http://localhost:8080/upload', data1, 'java');
            }
        }
        this.componentDidMount();

    }
    onSubmitFmeasure(e) {
        e.preventDefault();
        let givendata =this.props;
        console.log("props",this.props);
        this.state.train=givendata.location.state.files[1];
        this.state.test=givendata.location.state.files[2];
        this.state.cv=givendata.location.state.files[3];
        this.state.rf=givendata.location.state.files[10];
        this.state.nb=givendata.location.state.files[11];
        this.state.jr=givendata.location.state.files[12];
        this.state.j48=givendata.location.state.files[13];
        this.state.mlp=givendata.location.state.files[14];
        this.state.lr=givendata.location.state.files[15];
        this.state.knn=givendata.location.state.files[16];
        this.state.lrRidge=givendata.location.state.files[17];
        this.state.dts=givendata.location.state.files[18];
        this.state.lasso=givendata.location.state.files[19];
        this.state.BRRidge=givendata.location.state.files[20];
        this.state.gaussien=givendata.location.state.files[21];
        this.state.multinavesBayes=givendata.location.state.files[22];
        this.state.BernouilliNb=givendata.location.state.files[23];
        this.state.ComplementNb=givendata.location.state.files[24];
        this.state.neighbors=givendata.location.state.files[25];
        this.state.alphalasso=givendata.location.state.files[26];
        this.state.alpharidge=givendata.location.state.files[27];
        this.state.logistic=givendata.location.state.files[28];
        this.state.rfe=givendata.location.state.files[29];


        //Validation de données
        if(this.state.train === null || (!this.state.cv && this.state.test === null))
            this.setState({
                error: <div className="alert alert-danger" role="alert">Please select your train and test file</div>
            });
        else if(!this.state.rf && !this.state.nb && !this.state.jr && !this.state.j48 && !this.state.mlp && !this.state.lr && !this.state.knn && !this.state.lrRidge && !this.state.dts &&!this.state.lasso &&!this.state.BRRidge &&!this.state.gaussien &&!this.state.multinavesBayes && !this.state.BernouilliNb && !this.state.ComplementNb &&!this.state.nn &&!this.state.logistic &&!this.state.rfe )
            this.setState({
                error: <div className="alert alert-danger" role="alert">Please select at least one algorithm</div>
            });
        else {
            let data2 = new FormData();
            let data1 = new FormData();

            data1.append('train', givendata.location.state.files[1]);
            data1.append('test', givendata.location.state.files[2]);
            data1.append('rf', this.state.rf);
            data1.append('nb', this.state.nb);
            data1.append('jr',this.state.jr);
            data1.append('j48',this.state.j48);
            data1.append('mlp',this.state.mlp);
            data1.append('cv', givendata.location.state.files[3]);




            if(givendata.location.state.files[4] !== '')
                data1.append("nbSplits",givendata.location.state.files[4]);

            data2.append('train', givendata.location.state.files[1]);
            data2.append('test', givendata.location.state.files[2]);
            data2.append('lr', this.state.lr);
            data2.append('knn', this.state.knn);
            data2.append('lrRidge',this.state.lrRidge);
            data2.append('dts',this.state.dts);
            data2.append('lasso',this.state.lasso);
            data2.append('BRRidge',this.state.BRRidge);
            data2.append('gaussien',this.state.gaussien);
            data2.append('multinavesBayes',this.state.multinavesBayes);
            data2.append('BernouilliNb',this.state.BernouilliNb);
            data2.append('ComplementNb',this.state.ComplementNb);
            data2.append('logistic',this.state.logistic);
            data2.append('rfe',this.state.rfe);


            data2.append('cv', givendata.location.state.files[3]);


            if(this.state.cv===true)
                console.log(givendata.location.state.files[3]);
            data2.append("nbSplits", givendata.location.state.files[4]);
            if(this.state.knn)
                data2.append("neighbors", this.state.neighbors);
            if(this.state.lrRidge)
                data2.append("alpharidge", this.state.alpharidge);
            if(this.state.lasso) {
                data2.append("alphalasso", this.state.alphalasso);
                console.log("alphalasso",this.state.alphalasso);
            }
            //Si on a que des algos de java qui sont sélectionnés
            if (this.java() && !this.python()) {
                this.upload('http://localhost:8080/measure', data1, 'java');
                this.setState({pyRedirect: true});

                // que les algos de python
            } else if (!this.java() && this.python()) {
                this.upload('http://localhost:5000/measure', data2, 'python');
                this.setState({jRedirect: true});

                //au moins 1 algo sélectionné des deux côtés.
            } else {
                this.upload('http://localhost:5000/measure', data2, 'python');
                this.upload('http://localhost:8080/measure', data1, 'java');
            }
        }




    }
    ChangeRoute () {
        let givendata =this.props;
        console.log("props",this.props);
        this.state.train=givendata.location.state.files[1];
        this.state.test=givendata.location.state.files[2];
        this.state.cv=givendata.location.state.files[3];
        this.state.nbSplits=givendata.location.state.files[4];
        this.state.files.push(givendata.location.state.files[0]);
        this.state.files.push(this.state.train);
        this.state.files.push(this.state.test);
        this.state.files.push(this.state.cv);
        this.state.files.push(this.state.nbSplits);
        this.state.files.push(givendata.location.state.files[5]);
        this.state.files.push(givendata.location.state.files[6]);
        this.state.files.push(givendata.location.state.files[7]);
        this.state.files.push(givendata.location.state.files[8]);
        this.state.files.push(givendata.location.state.files[9]);
        this.props.history.push('/upload',{files:this.state.files});
        this.setState({changeRout: true});
        console.log("change",this.state.changeRout);
    }
    onSubmitRecall(e) {
        e.preventDefault();
        let givendata =this.props;
        console.log("props",this.props);
        this.state.train=givendata.location.state.files[1];
        this.state.test=givendata.location.state.files[2];
        this.state.cv=givendata.location.state.files[3];
        this.state.rf=givendata.location.state.files[10];
        this.state.nb=givendata.location.state.files[11];
        this.state.jr=givendata.location.state.files[12];
        this.state.j48=givendata.location.state.files[13];
        this.state.mlp=givendata.location.state.files[14];
        this.state.lr=givendata.location.state.files[15];
        this.state.knn=givendata.location.state.files[16];
        this.state.lrRidge=givendata.location.state.files[17];
        this.state.dts=givendata.location.state.files[18];
        this.state.lasso=givendata.location.state.files[19];
        this.state.BRRidge=givendata.location.state.files[20];
        this.state.gaussien=givendata.location.state.files[21];
        this.state.multinavesBayes=givendata.location.state.files[22];
        this.state.BernouilliNb=givendata.location.state.files[23];
        this.state.ComplementNb=givendata.location.state.files[24];
        this.state.neighbors=givendata.location.state.files[25];
        this.state.alphalasso=givendata.location.state.files[26];
        this.state.alpharidge=givendata.location.state.files[27];


        //Validation de données
        if(this.state.train === null || (!this.state.cv && this.state.test === null))
            this.setState({
                error: <div className="alert alert-danger" role="alert">Please select your train and test file</div>
            });
        else if(!this.state.rf && !this.state.nb && !this.state.jr && !this.state.j48 && !this.state.mlp && !this.state.lr && !this.state.knn && !this.state.lrRidge && !this.state.dts &&!this.state.lasso &&!this.state.BRRidge &&!this.state.gaussien &&!this.state.multinavesBayes && !this.state.BernouilliNb && !this.state.ComplementNb &&!this.state.nn &&!this.state.logistic )
            this.setState({
                error: <div className="alert alert-danger" role="alert">Please select at least one algorithm</div>
            });
        else {
            let data2 = new FormData();
            let data1 = new FormData();

            data1.append('train', givendata.location.state.files[1]);
            data1.append('test', givendata.location.state.files[2]);
            data1.append('rf', this.state.rf);
            data1.append('nb', this.state.nb);
            data1.append('jr',this.state.jr);
            data1.append('j48',this.state.j48);
            data1.append('mlp',this.state.mlp);
            data1.append('cv', givendata.location.state.files[3]);




            if(givendata.location.state.files[4] !== '')
                data1.append("nbSplits",givendata.location.state.files[4]);

            data2.append('train', givendata.location.state.files[1]);
            data2.append('test', givendata.location.state.files[2]);
            data2.append('lr', this.state.lr);
            data2.append('knn', this.state.knn);
            data2.append('lrRidge',this.state.lrRidge);
            data2.append('dts',this.state.dts);
            data2.append('lasso',this.state.lasso);
            data2.append('BRRidge',this.state.BRRidge);
            data2.append('gaussien',this.state.gaussien);
            data2.append('multinavesBayes',this.state.multinavesBayes);
            data2.append('BernouilliNb',this.state.BernouilliNb);
            data2.append('ComplementNb',this.state.ComplementNb);
            data2.append('logistic',this.state.logistic);



            data2.append('cv', givendata.location.state.files[3]);


            if(this.state.cv===true)
                console.log(givendata.location.state.files[3]);
            data2.append("nbSplits", givendata.location.state.files[4]);
            if(this.state.knn)
                data2.append("neighbors", this.state.neighbors);
            if(this.state.lrRidge)
                data2.append("alpharidge", this.state.alpharidge);
            if(this.state.lasso) {
                data2.append("alphalasso", this.state.alphalasso);
                console.log("alphalasso",this.state.alphalasso);
            }
            //Si on a que des algos de java qui sont sélectionnés
            if (this.java() && !this.python()) {
                this.upload('http://localhost:8080/recall', data1, 'java');
                this.setState({pyRedirect: true});

                // que les algos de python
            } else if (!this.java() && this.python()) {
                this.upload('http://localhost:5000/recall', data2, 'python');
                this.setState({jRedirect: true});

                //au moins 1 algo sélectionné des deux côtés.
            } else {
                this.upload('http://localhost:5000/recall', data2, 'python');
                this.upload('http://localhost:8080/recall', data1, 'java');
            }
        }




    }



    /**
     * Dès que le composant est monté on commence par récupérer nos données
     * reçues des deux serveurs éventuellement
     * ET on teste chaque algorithme s'il avait été sélectionné ou s'il a rétourné une
     * erreur (-1000)
     * @returns {Promise<void>}
     */


    async componentDidMount() {

        console.log("olajalj",JSON.parse(localStorage.getItem('data')));
        const givenData = JSON.parse(localStorage.getItem('data'));
        const givenData2 = JSON.parse(localStorage.getItem('data2'));
        let dataOfData = [];
        let labels = [];
        let errors = [];
        if (givenData !== null && givenData.rf !== undefined) {
            if (givenData.rf === "-1000")
                errors.push(
                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            Problème au niveau de l'algo Random Forest,
                            vérifiez vos data
                        </div>
                );
            else {
                dataOfData.push(parseFloat(givenData.rf));
                labels.push("Random Forest");
            }
        }
        if (givenData !== null && givenData.j48 !== undefined) {
            if (givenData.rf === "-1000")
                errors.push(
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        Problème au niveau de l'algo arbre de decision,
                        vérifiez vos data
                    </div>
                );
            else {
                dataOfData.push(parseFloat(givenData.j48));
                console.log("j48",givenData.j48);
                labels.push("arbre de decision");
            }
        }
        if (givenData !== null && givenData.mlp !== undefined) {
            if (givenData.mlp === "-1000")
                errors.push(
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        Problème au niveau de l'algo multiLayer,
                        vérifiez vos data
                    </div>
                );
            else {
                dataOfData.push(parseFloat(givenData.mlp));
                console.log("mlp",givenData.mlp);
                labels.push("multiLayerperceptron");
            }
        }
        if (givenData !== null && givenData.nb !== undefined) {
            if (givenData.nb === "-1000")
                errors.push(
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        Problème au niveau de l'algo Naive Bayes,
                        vérifiez vos data
                    </div>
                );
            else {
                dataOfData.push(parseFloat(givenData.nb));
                labels.push("Naive Bayes");
            }
        }
        if (givenData !== null && givenData.jr !== undefined) {
            if (givenData.jr === "-1000")
                errors.push(
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        Problème au niveau de l'algo JRip,
                        vérifiez vos data
                    </div>
                );
            else {
                dataOfData.push(parseFloat(givenData.jr));
                labels.push("JRip");
            }
        }

        if (givenData2 !== null && givenData2.knn !== null) {
            dataOfData.push(parseFloat(givenData2.knn) * 100);
            labels.push("KNN");
        }
        if (givenData2 !== null && givenData2.lrRidge !== null) {
            dataOfData.push(parseFloat(givenData2.lrRidge) * 100);
            labels.push("lrRidge");
        }
        if (givenData2 !== null && givenData2.lasso !== null) {
            dataOfData.push(parseFloat(givenData2.lasso) * 100);
            labels.push("lasso");
        }
        if (givenData2 !== null && givenData2.BRRidge !== null) {
            dataOfData.push(parseFloat(givenData2.BRRidge) * 100);
            labels.push("BRRidge");
        }
        if (givenData2 !== null && givenData2.dts !== null) {
            dataOfData.push(parseFloat(givenData2.dts) * 100);
            labels.push("decision tree");
        }

        if (givenData2 !== null && givenData2.lr !== null) {
            dataOfData.push(parseFloat(givenData2.lr) * 100);
            labels.push("linear regression");
        }
        if (givenData2 !== null && givenData2.gaussien !== null) {
            dataOfData.push(parseFloat(givenData2.gaussien) * 100);
            labels.push("gaussien naive bases");
        }
        if (givenData2 !== null && givenData2.multinavesBayes !== null) {
            dataOfData.push(parseFloat(givenData2.multinavesBayes) * 100);
            labels.push("mutinavesBayes");
        }
        if (givenData2 !== null && givenData2.BernouilliNb !== null) {
            dataOfData.push(parseFloat(givenData2.BernouilliNb) * 100);
            labels.push("Bernouilli Naves Bayes");
        }
        if (givenData2 !== null && givenData2.ComplementNb !== null) {
            dataOfData.push(parseFloat(givenData2.ComplementNb) * 100);
            labels.push("Complement Naves Bayes");
        }
        if (givenData2 !== null && givenData2.logistic !== null) {
            dataOfData.push(parseFloat(givenData2.logistic) * 100);
            labels.push("Logistic regression");
        }
        if (givenData2 !== null && givenData2.rfe !== null) {
            dataOfData.push(parseFloat(givenData2.rfe) * 100);
            labels.push("RFE");
        }



        //La partie données de chartjs
        const data = {
            labels: labels,
            datasets: [{
                label: "Algorithms comparision",
                backgroundColor: ['#00acc1', '#512da8', '#33691e', '#6d4c41', '#90a4ae','#f44336','#FFD433','#cddc39','#3CFF33','#D433FF','#FF33D1','#FF333C','#FF8333','#33FFB5','#FF33BE','#3368FF'],
                data: dataOfData,
            }]
        };

        await this.setState({
            data: data,
            error: errors
        });

    }

    render() {
        console.log("dataino",JSON.parse(localStorage.getItem('data')));
        return(
             this.state.changeRout?
                 <Route render={({history}) => history.push(`/upload`)}/> :
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
                                    <span className="label">Upload Your Algo</span>
                                </a>
                            </li>


                            <li className="completed">
                                <a href="#!">
                                    <span className="circle">3</span>
                                    <span className="label">Visualisation</span>
                                </a>
                            </li>

                        </ul>

                    </div>
                </div>
                <a id= "previous" onClick={this.ChangeRoute} className="previous">&laquo; Previous</a>
                <div className="row" style={{ marginTop: '50px'}}>
                    <nav className="menu" style={{marginRight:'300px'}}>
                        <ul className="site-nav">
                            <li className="nav-item" onClick={this.onSubmit}><a className="nav-link">Score</a></li>
                            <li className="nav-item" onClick={this.onSubmitFmeasure}><a className="nav-link">F-measure</a></li>
                            <li className="nav-item"onClick={this.onSubmitRecall}><a className="nav-link">Recall</a></li>

                        </ul>

                    </nav>
                <div className="col-md-4"></div>

                <h3 className="mt-9" style={{marginLeft:'400px'}}>Your algorithms comparison</h3>
                <div className="col-md-12">
                    <Bar
                        data={this.state.data}
                        options={this.state.barChartOptions}
                        height={600}
                        width={1000000}
                    />
                </div>
                <div className="col-md-5"></div>
                <div className="col-md-4">
                    {this.state.error}

                </div>
            </div>
            </div>


        );
    }
}
