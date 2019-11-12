import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import {Input, Typography} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Upload from "./Upload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Search from "./Search"



export default class SearchAndUpload extends Component {

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
            j48: false,
            mlp: false,
            dts: false,
            cv: false,
            route:false,
            showUpload:false,
            showSearch:true,
            nbSplits: '',
            st: '',
            nbSplitsShow: 'none',
            neighborsShow: 'none',
            alphaShow: 'none',
            neighbors: '',
            alpha: '',
            jRedirect: false,
            pyRedirect: false,
            error: '',
            pyLoading: false,
            jLoading: false,
            searchclick: false,
            files:[],
        };

        this.ChangeRoute=this.ChangeRoute.bind(this);
        this.toggleCV=this.toggleCV.bind(this);
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
            this.setState({nbSplitsShow: 'inline-block', testShow : 'none'});
        else
            this.setState({nbSplitsShow: 'none', testShow: 'inline-block'});
    };

    ChangeRoute(e){
        e.preventDefault();

        this.state.files.push(this.state.train);
        this.state.files.push(this.state.test);
        this.state.files.push(this.state.cv);
        this.state.files.push(this.state.nbSplits);

        this.setState({showUpload:true});
        this.setState({showSearch:false});


    };
        //this.setState({ route: true });

    componentDidMount() {
        let givendata=this.props.changeit;
        console.log(givendata);
        localStorage.removeItem('data');
        localStorage.removeItem('data2');
        localStorage.removeItem('data4');
        localStorage.removeItem('data5');
    }

    render() {
        const style= this.state.showSearch? {display:'none'}: {};
        return(
            this.state.route?
                <Route render={({ history }) => history.push(`/upload`)  }/> :
                this.state.searchclick?
                    <Route render={({ history }) => history.push("/youtube")  }/> :

                    <div className="container">:
                           {this.state.showUpload ? <Upload changeit={this.state.files}/> :null}
                            </div>


        )
    }
}
