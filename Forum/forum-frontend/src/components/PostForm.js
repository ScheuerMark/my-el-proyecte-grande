import React, { Component } from 'react';

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
        const target = event.target();
        const name = target.type === "text" ? 'title' : 'message';
        this.setState({[name]:value});
    }
    
    handleSubmit(event){
        event.preventDefault();
        let formData = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        fetch('api/Home/Posts/{topicName}', formData)
            .then((response) => response.ok)
    }
    
    render(){
        return (
            <form onSubmit={this.handleSubmit()}>
                <label>
                Title:
                    <input type={"text"} value={this.state.title} onChange={this.handleChange()}/>
                </label>
                <label>
                    Message:
                    <input type={<textarea name="message" id="postMessage" cols="30" rows="10"></textarea>} value={this.state.message} onChange={this.handleChange()}/>
                </label>
                <input type={"submit"} value={"Add new post"}/>
            </form>
        )
    }
}