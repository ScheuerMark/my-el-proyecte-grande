import React, { Component } from 'react';
import {  useParams } from "react-router-dom";
import { Comment } from '../Comment';


class PostDetails extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            post: "",
        }
        this.renderComments = this.renderComments.bind(this);
        this.renderPost = this.renderPost.bind(this);
    } 

    componentDidMount(){
        fetch(`/api/Home/PostDetails/${this.props.params.id}`)
        .then((response) => response.json())
        .then(data => {
            this.setState({ post: data });
        });
    }

    renderComments(){
        let comments = [];
        if(this.state.post.comments)
        for (let index = 0; index < this.state.post.comments.length; index++) {   
            comments.push(<Comment key={this.state.post.comments[index].id} data={this.state.post.comments[index]} />);
        }
        return comments;
    }

    renderPost(){
        if(this.state.post)
        return <Post key={this.state.post.id} data={this.state.post}/>;
    }

    render() {
        return (
          <div class="row">
            <div class="col-xl-10 col-lg-12">
                {this.renderPost()}
                <br/>
            </div> 
            <div class="col-xl-9 col-lg-11">
			    {this.renderComments()}
		    </div>
          </div>
        );
      }
}


class Post extends Component{
    constructor(props) { 
        super(props); 
        this.state = {
            date: new Date(this.props.data.dateTime).toLocaleString(),
        }
    } 

    render() {
        return (                           
                <div class="card">
                    <div class="card-header">
                        <h5 class="d-inline-flex">{this.props.data.title}</h5>
                        <span class="float-end  fst-italic">{this.state.date}</span>
                        <br/>
                        <span class="fst-italic">Username</span>                     
                    </div>
                    <div class="card-body row">
                        <div class="col-xl-9 col-lg-12">
                            <p class="card-text">{this.props.data.message}</p>
                        </div>
                        <div class="col-12 d-flex flex-column">
                            <button class="btn-sm btn-outline-dark mt-auto ms-auto" type="button">Comment</button>
                        </div>
                    </div>
                </div>                         
        );
      }
}

export default (props) => (
    <PostDetails
        {...props}
        params={useParams()}
/>)