import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './styles/styles.css';
import Nav from './views/Nav';
import Home from "./views/Home";
import Upload from "./views/Upload";
import DisplayCharts from "./views/DisplayCharts";
import VideoYoutube from "./views/VideoYoutube";
import SearchAndUpload from "./views/SearchAndUpload";
import Account from "./views/Account";
import Search from "./views/Search";
import Register from "./views/Register";
import StepperML from "./views/StepperML";
import Quiz from "./views/Quiz";



/**
 * The application entry
 * defining all the application Routes
 */
ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route component={Nav} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/upload" component={Upload}/>
                <Route path="/Search" component={Search}/>
                <Route path="/chart" component={DisplayCharts}/>
                <Route path="/youtube" component={VideoYoutube}/>
                <Route path="/SearchAndUpload" component={SearchAndUpload}/>
                <Route path="/Account" component={Account}/>
                <Route path="/Register" component={Register}/>
                <Route path="/StepperML" component={StepperML}/>
                <Route path="/Quiz" component={Quiz}/>


            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
