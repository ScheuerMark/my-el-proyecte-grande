import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {EditModalTopic} from "../EditModals";
import { getTopics } from '../ApiRequest';
import { UserContext } from '../../App';
import './Topic.css'

const Topic = ({topic, update}) => {
  const [topicState, setTopicState] = useState(topic)
  const commentIcon = <FontAwesomeIcon icon={faCommentAlt} />;
  const edit = <button type="button" className="btn btn-primary-outline" data-bs-toggle="modal"
                       data-bs-target={`#editTopicModal${topicState.id}`}><FontAwesomeIcon icon={faEdit} /></button>;
  const trash = <FontAwesomeIcon icon={faTrash} />;

  const userContext = useContext(UserContext);

  function deleteTopic(){
    fetch(`/api/Home/DeleteTopic/${topic.id}`, {
        method: 'DELETE'
    }).then((response) => response.ok).then(x=> getTopics().then(data => update(data)));
  }

  return (
    <div className={`card ${topicState?.id < 0 ? "loading":""}`}>
        <div className="card-header">
            <h5 className="w-75 d-inline-flex">
              <Link className=" w-100 text-black text-decoration-none" to={`/Posts/${topicState.title}`}>{topicState.title}</Link></h5>
            <span className="float-end post-count fst-italic">{topicState.numberOfPosts} {commentIcon}
            {userContext.roles?.includes("Admin") ? 
            (
              <>
                 {edit}
                <Link onClick={()=>deleteTopic()} class="align-middle text-decoration-none text-black me-3">{trash}</Link>
              </>
            ) : ""}
             
            
            </span>
        </div>
        <div className="card-body row">
            <div className="col-9">
                <p className="card-text" style={topicState?.id < 0 ? {backgroundColor: "grey", width : "30%"} :null }>{topicState.description}</p>
            </div>
            <div className="col-3 d-flex flex-column">
                <Link className="fst-italic mt-auto ms-auto text-black" style={topicState?.id < 0 ? {pointerEvents: "none"} :null } to={`/Posts/${topicState.title}`}>view posts</Link>
            </div>
        </div>
        <EditModalTopic id={topicState.id} title={topicState.title} description={topicState.description} update={setTopicState}/>
    </div>
  )
}

export default Topic