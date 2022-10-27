import React, {Component, useState} from 'react';
import ReactDOM from "react-dom/client";
import {PostForm} from "./PostForm";


export class Modal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };
    }
    openModal = () => {
        this.setState({isOpen: false});
        console.log(this.state.isOpen);
    };
    closeModal = () => this.setState({ isOpen: true });
    
    render() {
        return (
            <>
                
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <label>Title:</label>
                                    <input type={"text"} value={this.state.title} onChange={this.handleChange}/>
                                    <br/>
                                    <label>Message:</label>
                                    <textarea name="message" id="postMessage" cols="30" rows="10" value={this.state.message} onChange={this.handleChange}></textarea>

                                    <input type={"submit"} value={"Add new post"}/>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}