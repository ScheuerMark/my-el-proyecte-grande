import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export class Comment extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            like: <FontAwesomeIcon icon={faThumbsUp} />,
            dislike : <FontAwesomeIcon icon={faThumbsDown} />,
            date: new Date(this.props.data.dateTime).toLocaleString(),
        }; 
        this.likeComment=this.likeComment.bind(this);
        this.disLikeComment=this.disLikeComment.bind(this);
      } 
    likeComment(){
    fetch(`/api/Home/Like/${this.props.data.id}`, {
        method: 'PUT',
    });
    this.props.data.like++;
    }


    disLikeComment(){
        fetch(`/api/Home/DisLike/${this.props.data.id}`, {
            method: 'PUT',
        });
        this.props.data.disLike++;
    }

  render() {
    return (
        <div class="card">
            <div class="card-header">
                <h5 class="d-inline">Username</h5>
                <span class="float-end  fst-italic">{this.state.date}</span>
            </div>
        <div class="card-body row" >
            <div class="col-12">
                <p class="card-text">{this.props.data.message}</p>
            </div>
            <div class="col-12 d-flex flex-column">
                <span class="fst-italic mt-auto ms-auto">
                    <Link onClick={this.likeComment} class="align-middle text-decoration-none text-black me-3">{this.state.like} {this.props.data.like}</Link>
                    <Link onClick={this.disLikeComment} class="align-middle text-decoration-none text-black">{this.state.dislike} {this.props.data.disLike} </Link>
                </span>
            </div>
        </div>
        </div>
    );
  }
}