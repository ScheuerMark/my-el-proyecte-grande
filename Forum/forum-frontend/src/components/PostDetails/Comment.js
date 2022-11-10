import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight-words';
import {EditModalComment} from "../EditModals";
import {getCommentById} from "../ApiRequest";


export function Comment({comment,searchPhrase,postId}) {
    const [commentState, setCommentState] = useState(comment);
    const like = <FontAwesomeIcon icon={faThumbsUp} />;
    const dislike = <FontAwesomeIcon icon={faThumbsDown} />;
    const edit = <FontAwesomeIcon icon={faEdit}/>;
    const date = new Date(comment.dateTime).toLocaleString();


    function likeComment(){
        fetch(`/api/Home/Like/${commentState.id}`, {
            method: 'PUT',
        }).then(response => response.ok).then(x=> {
            getCommentById(commentState.id).then(data => setCommentState(data))});
    }


    function disLikeComment(){
        fetch(`/api/Home/DisLike/${commentState.id}`, {
            method: 'PUT',
        }).then(response => response.ok).then(x=> {
            getCommentById(commentState.id).then(data => setCommentState(data))});
    }

return (
    <div className="card">
        <div className="card-header">
            <h5 className="d-inline">Username</h5>
            <span className="float-end  fst-italic">{date}</span>
        </div>
    <div className="card-body row" >
        <div className="col-12">
            <p className="card-text">
            <Highlight searchWords={[searchPhrase]}
            textToHighlight={`${commentState.message}`}>                       
            </Highlight>
            </p>
        </div>
        <div className="col-12 d-flex flex-column">
            <span className="fst-italic mt-auto ms-auto">
                <Link onClick={likeComment} className="align-middle text-decoration-none text-black me-3">{like} {commentState.like}</Link>
                <Link onClick={disLikeComment} className="align-middle text-decoration-none text-black">{dislike} {commentState.disLike} </Link>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target={`#editCommentModal${commentState.id}`}>{edit}</button>
                
            </span>
        </div>
    </div>
        <EditModalComment update={setCommentState} comment={commentState} />
    </div>
);
  
}