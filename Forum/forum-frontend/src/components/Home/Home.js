import React, { Component } from 'react';
import './Home.css';
import { Post } from '../Shared/Post';
import Topic from '../Shared/Topic';



export class Home extends Component {   

    constructor(props) { 
        super(props); 
        this.state = {
            topics: [],
            recentPosts: []
        }; 
    } 

    componentDidMount() {
        fetch('api/Home/Topics')
        .then((response) => response.json())
        .then(data => {
            this.setState({ topics: data });
        });
        fetch('api/Home/Posts/Date/Desc')
        .then((response) => response.json())
        .then(data => {
            this.setState({ recentPosts: data });
        });
    }

    renderTopics(){
        let topics = [];
        for (let index = 0; index < this.state.topics.length; index++) {   
            topics.push(<Topic key={this.state.topics[index].title} data={this.state.topics[index]} />);
        }
        return topics;
    }

    renderRecentPosts(){
        let recentPosts = [];
        for (let index = 0; index < this.state.recentPosts.length; index++) {   
            recentPosts.push(<Post key={this.state.recentPosts[index].id} data={this.state.recentPosts[index]} />);
        }
        return recentPosts;
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
                {this.renderRecentPosts()}
            </div>
        </div>		
    </div>
      );
    }
  }
  
  export default Home;