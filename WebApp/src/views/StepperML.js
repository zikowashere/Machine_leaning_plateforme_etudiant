
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
export default class StepperML extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let givenData= this.props.changeit;
        console.log("givdatastep",givenData);
    }


    render() {
        return (

            <div class="row">
                <div class="col-md-12">


                    <ul class="stepper stepper-horizontal">


                        <li class="completed">
                            <a href="#!">
                                <span class="circle">1</span>
                                <span class="label">First step</span>
                            </a>
                        </li>

                        <li class="">
                            <a href="#!">
                                <span class="circle">2</span>
                                <span class="label">Second step</span>
                            </a>
                        </li>


                        <li class="warning">
                            <a href="#!">
                                <span class="circle"><i class="fas fa-exclamation"></i></span>
                                <span class="label">Third step</span>
                            </a>
                        </li>

                    </ul>

                </div>
            </div>


        )
    }
}
