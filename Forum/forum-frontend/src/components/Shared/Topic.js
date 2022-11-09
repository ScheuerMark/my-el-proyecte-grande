import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import {EditModalTopic} from "../EditModals";

const Topic = ({topic}) => {
  const commentIcon = <FontAwesomeIcon icon={faCommentAlt} />;
  const edit = <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                       data-bs-target="#editTopicModal"><FontAwesomeIcon icon={faEdit} /></button>;

  return (
    <div className="card">
        <div className="card-header">
            <h5 className="w-75 d-inline-flex"><Link className=" w-100 text-black text-decoration-none" to={`/Posts/${topic.title}`}>{topic.title}</Link></h5>
            <span className="float-end post-count fst-italic">{topic.numberOfPosts} {commentIcon} {edit}</span>
        </div>
        <div className="card-body row">
            <div className="col-9">
                <p className="card-text">{topic.description}</p>
            </div>
            <div className="col-3 d-flex flex-column">
                <Link className="fst-italic mt-auto ms-auto text-black" to={`/Posts/${topic.title}`}>view posts</Link>
            </div>
        </div>
        <EditModalTopic id={topic.id} title={topic.title} description={topic.description} update={topic.update}/>
    </div>
  )
}

export default Topic