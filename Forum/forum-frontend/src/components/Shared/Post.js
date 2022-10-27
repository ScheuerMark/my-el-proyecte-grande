import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import './Post.css'

export class Post extends Component {
   
    constructor(props) { 
      super(props); 
      this.state = {
          commentIcon: <FontAwesomeIcon icon={faCommentDots} />,
          collapsedIcon: <FontAwesomeIcon className='text-collapsed' icon={faAngleDown} />,
          expandedIcon: <FontAwesomeIcon  className='text-expanded' icon={faAngleUp} />,
      }; 
    }
    
    render() {
      return (
        <div className="card">
	        <div className="card-header">
		        <h5 className="w-75 d-inline-flex"><Link className=" w-100 text-black text-decoration-none" to={`/PostDetail/${this.props.data.id}`}>{this.props.data.title}</Link></h5>
		        <span className="float-end post-count fst-italic">{this.props.data.numberOfComments} {this.state.commentIcon}
			        <button className="btn-sm btn-outline-dark text-toogle" type="button" data-bs-toggle="collapse" data-bs-target={`#id${this.props.data.id}`} aria-expanded="false" aria-controls={`id${this.props.data.id}`}>
                        {this.state.collapsedIcon}
                        {this.state.expandedIcon}
			        </button>
                </span>
	        </div>
	        <div className="collapse" id={`id${this.props.data.id}`}>
                <div className="card-body row" >
		            <div className="col-9">
			            <p className="card-text">{this.props.data.message}</p>
		            </div>
		            <div className="col-3 d-flex flex-column">
			            <Link className="fst-italic mt-auto ms-auto" to={`/PostDetail/${this.props.data.id}`}>view comments</Link>
		            </div>
	            </div>
	        </div>
        </div>
      );
    }
  }

export default Post;