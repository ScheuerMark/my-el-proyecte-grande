import React, { Component, useEffect } from 'react';
import {  useParams } from "react-router-dom";
import {PostForm} from "../PostForm";
import Post from '../Shared/Post';
import { fetchPosts } from '../ApiRequest';


class TopicDetails extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            posts: [{id: "-1"},{id: "-2"},{id: "-3"}],
        }
        
        this.updatePosts = this.updatePosts.bind(this)
    } 

    componentDidMount(){
        fetchPosts(this.props.params.title).then(data => this.updatePosts(data));
    }

    componentDidUpdate(prevProps){
        if(prevProps.params.title!==this.props.params.title){
            this.updatePosts([{id: "-1"},{id: "-2"},{id: "-3"}])
            fetchPosts(this.props.params.title).then(data => this.updatePosts(data));
        }
    }
    
    updatePosts(data){
        this.setState({ posts: data });
    }

    render() {
        return (
            <main role="main" className="pb-3">
                <div >
	                <div className="row">
		                <h1 className="text-center">{this.props.params.title}</h1>
		                <div className="col-12">
                            {this.state.posts.map((element, index) => <Post key={element.id} post={element} update={this.updatePosts} title={this.props.params.title}/>)}
		                </div>
	                </div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal">
                        Add new post
                    </button>
                    <PostForm title={this.props.params.title} update={this.updatePosts}/>
                </div>
            </main>    
        );
      }
}

export default (props) => (
    <TopicDetails {...props} params={useParams()}/>)