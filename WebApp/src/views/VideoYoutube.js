
import React from 'react'
import { Component } from 'react';

export default class VideoYoutube extends Component {
    constructor(props) {
        super(props);
        this.givendata = JSON.parse(localStorage.getItem('data4'));
        this.ReturnSearch=this.ReturnSearch.bind();
    }
    async componentDidMount() {
        //const givenData = JSON.parse(localStorage.getItem('data4'));
        //this.givendata;
    }
    createTable = () => {

            //const givenData = JSON.parse(localStorage.getItem('data4'));
            console.log("givendata", this.givendata);
            let table = [];

            // Outer loop to create parent
            for (let i = 0; i < 10; i++) {
                //let children = []
                //Inner loop to create children

                table.push(<div style={{marginTop:'10vh'}}><iframe id={i} title={i} width="420" height="315"
                                   src={`https://www.youtube.com/embed/${this.givendata[i].items[0].id}`}></iframe></div>);}


            return table
        }
        ReturnSearch(){
        let data8=true;
        console.log(JSON.stringify(data8));
        localStorage.setItem("data8",JSON.stringify(data8));

        }


    render() {
        return(

            <div className="container">
                <div className="container">
                    <a href="/Search" type="button">return</a>
                </div>
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
            <div class="row" style={{marginTop:'120px'}}>

                {this.createTable()}
            </div>
            </div>
            </div>

        )
    }

}
