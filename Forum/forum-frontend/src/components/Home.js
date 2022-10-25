import { data } from 'jquery';
import React, { Component } from 'react';
import './Home.css';
import Topic from './Topic';



export class Home extends Component {   

    constructor(props) { 
        super(props); 
        this.state = {
            topics: []
        }; 
    } 

    componentDidMount() {
        fetch('api/Home/Topics')
        .then((response) => response.json())
        .then(data => {
            this.setState({ topics: data });
        });
    }

    renderTopics(){
        let topics = [];
        for (let index = 0; index < this.state.topics.length; index++) {   
            topics.push(<Topic key={index} data={this.state.topics[index]} />);
        }
        return topics;
    }

    render() {
      return (
    <div>
        <div className="row">
            <div className="col-xl-6 col-lg-12 column1">
                <h1>Topics</h1>
                {this.renderTopics()}
            </div>
            <div className="col-xl-6 d-xl-block d-none">
                <h1>Recent posts</h1>
                </div>
        </div>		
    </div>
      );
    }
  }
  
  export default Home;