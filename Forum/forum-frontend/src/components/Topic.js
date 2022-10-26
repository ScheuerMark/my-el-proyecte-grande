import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

export class Topic extends Component {
   
    constructor(props) { 
      super(props); 
      this.state = {
          commentIcon: <FontAwesomeIcon icon={faCommentAlt} />,
      }; 
    } 
    render() {
      return (
        <div className="card">
            <div className="card-header">
                <h5 className="w-75 d-inline-flex"><a className=" w-100 text-black text-decoration-none">{this.props.data.title}</a></h5>
                <span className="float-end post-count fst-italic">{this.props.data.numberOfPosts} {this.state.commentIcon}</span>
            </div>
            <div className="card-body row">
                <div className="col-9">
                    <p className="card-text">{this.props.data.description}</p>
                </div>
                <div className="col-3 d-flex flex-column">
                    <Link className="fst-italic mt-auto ms-auto text-black" to={`/Posts/${this.props.data.title}`}>view posts</Link>
                </div>
            </div>
        </div>
      );
    }
  }

export default Topic;