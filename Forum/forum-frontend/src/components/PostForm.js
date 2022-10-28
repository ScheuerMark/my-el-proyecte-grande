import React, { Component } from 'react';
import { fetchPosts } from './ApiRequest';
import { postPost } from './ApiRequest';

export class PostForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        const target = event.target;
        const value = event.target.value;
        const name = target.name;
        this.setState({[name]:value});
    }
    
    handleSubmit(event){
        event.preventDefault();
        postPost(this.state, this.props.title).then(x=> {
        fetchPosts(this.props.title).then(data => this.props.update(data))}); 
    }
    
    render(){
        return (
            <div className="mt-3">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add new post
            </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">New post</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        
                            <label>Title:</label>
                            <input type="text" className="form-control" name={"title"} value={this.state.title} onChange={this.handleChange}/>
                            <br/>
                            <label>Message:</label>
                            <textarea className="form-control" name="message" id="postMessage" cols="30" rows="10" value={this.state.message}
                                      onChange={this.handleChange}></textarea>
                     
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Send post</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
            </div>
        )
    }
}