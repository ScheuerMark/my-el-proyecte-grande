import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import './Post.css'

const Post = ({post}) => {
  const commentIcon = <FontAwesomeIcon icon={faCommentDots} />;
  const collapsedIcon = <FontAwesomeIcon className='text-collapsed' icon={faAngleDown} />;
  const expandedIcon = <FontAwesomeIcon  className='text-expanded' icon={faAngleUp} />;

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="w-75 d-inline-flex"><Link className=" w-100 text-black text-decoration-none" to={`/PostDetail/${post.id}`}>{post.title}</Link></h5>
        <span className="float-end post-count fst-italic">{post.numberOfComments} {commentIcon}
          <button className="btn-sm btn-outline-dark text-toogle" type="button" data-bs-toggle="collapse" data-bs-target={`#id${post.id}`} aria-expanded="false" aria-controls={`id${post.id}`}>
                    {collapsedIcon}
                    {expandedIcon}
          </button>
            </span>
      </div>
      <div className="collapse" id={`id${post.id}`}>
            <div className="card-body row" >
            <div className="col-9">
              <p className="card-text">{post.message}</p>
            </div>
            <div className="col-3 d-flex flex-column">
              <Link className="fst-italic mt-auto ms-auto" to={`/PostDetail/${post.id}`}>view comments</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Post