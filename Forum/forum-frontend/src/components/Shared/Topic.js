import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import {EditModalTopic} from "../EditModals";

const Topic = ({topic}) => {
    const [topicState, setTopicState] = useState(topic)
  const commentIcon = <FontAwesomeIcon icon={faCommentAlt} />;
  const edit = <button type="button" className="btn btn-primary-outline" data-bs-toggle="modal"
                       data-bs-target={`#editTopicModal${topicState.id}`}><FontAwesomeIcon icon={faEdit} /></button>;

  return (
    <div className="card">
        <div className="card-header">
            <h5 className="w-75 d-inline-flex"><Link className=" w-100 text-black text-decoration-none" to={`/Posts/${topicState.title}`}>{topicState.title}</Link></h5>
            <span className="float-end post-count fst-italic">{topicState.numberOfPosts} {commentIcon} {edit}</span>
        </div>
        <div className="card-body row">
            <div className="col-9">
                <p className="card-text">{topicState.description}</p>
            </div>
            <div className="col-3 d-flex flex-column">
                <Link className="fst-italic mt-auto ms-auto text-black" to={`/Posts/${topicState.title}`}>view posts</Link>
            </div>
        </div>
        <EditModalTopic id={topicState.id} title={topicState.title} description={topicState.description} update={setTopicState}/>
    </div>
  )
}

export default Topic