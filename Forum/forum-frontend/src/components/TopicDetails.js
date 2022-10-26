import React, { Component } from 'react';
import {  useParams } from "react-router-dom";
import { Post } from './Post';


class TopicDetails extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            posts: []
        }
    } 

    componentDidMount(){
        fetch(`/api/Home/Posts/${this.props.params.title}`)
        .then((response) => response.json())
        .then(data => {
            this.setState({ posts: data });
        });
    }

    renderPosts(){
        let posts = [];
        for (let index = 0; index < this.state.posts.length; index++) {   
            posts.push(<Post key={this.state.posts[index].id} data={this.state.posts[index]} />);
        }
        return posts;
    }

    render() {
        return (
            <main role="main" className="pb-3">
                <div >
	                <div className="row">
		                <h1 className="text-center">{this.props.params.title}</h1>
		                <div className="col-12">
			                {this.renderPosts()}
		                </div>
	                </div>
                </div>      
            </main>    
        );
      }
}

export default (props) => (
    <TopicDetails
        {...props}
        params={useParams()}
/>)