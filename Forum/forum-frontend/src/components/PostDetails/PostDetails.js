import React, { Component } from 'react';
import {  useParams } from "react-router-dom";
import { Comment } from './Comment';
import { getComments } from '../ApiRequest';
import { CommentForm } from '../CommentForm';

class PostDetails extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            post: {
                comments: []
            },
        }
        this.updateComments = this.updateComments.bind(this);
    } 

    componentDidMount(){
        getComments(this.props.params.id).then(data => {
            this.setState({ post: data });
        });
    }

    updateComments(data){
        this.setState({ post: data });
    }

    render() {
        return (
          <div className="row">
            <div className="col-xl-10 col-lg-12">
                <Post key={this.state.post.id} data={this.state.post} update={this.updateComments}/>
                <br/>
            </div> 
            <div className="col-xl-9 col-lg-11">
                {this.state.post.comments.map((element, index) => <Comment key={index} data={element}/> )}
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
                <div className="card">
                    <div className="card-header">
                        <h5 className="d-inline-flex">{this.props.data.title}</h5>
                        <span className="float-end  fst-italic">{this.state.date}</span>
                        <br/>
                        <span className="fst-italic">Username</span>                     
                    </div>
                    <div className="card-body row">
                        <div className="col-xl-9 col-lg-12">
                            <p className="card-text">{this.props.data.message}</p>
                        </div>
                        <div className="col-12 d-flex flex-column">
                            <CommentForm update={this.props.update} id={this.props.data.id}></CommentForm>
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