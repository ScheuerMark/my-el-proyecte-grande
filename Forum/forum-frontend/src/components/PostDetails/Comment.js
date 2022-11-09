import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight-words';


export function Comment({comment,searchPhrase}) {

    const like = <FontAwesomeIcon icon={faThumbsUp} />;
    const dislike = <FontAwesomeIcon icon={faThumbsDown} />;
    const date = new Date(comment.dateTime).toLocaleString();


    function likeComment(){
        fetch(`/api/Home/Like/${comment.id}`, {
            method: 'PUT',
        });
        comment.like++;
    }


    function disLikeComment(){
        fetch(`/api/Home/DisLike/${comment.id}`, {
            method: 'PUT',
        });
        comment.disLike++;
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
            textToHighlight={`${comment.message}`}>                       
            </Highlight>
            </p>
        </div>
        <div className="col-12 d-flex flex-column">
            <span className="fst-italic mt-auto ms-auto">
                <Link onClick={likeComment} class="align-middle text-decoration-none text-black me-3">{like} {comment.like}</Link>
                <Link onClick={disLikeComment} class="align-middle text-decoration-none text-black">{dislike} {comment.disLike} </Link>
            </span>
        </div>
    </div>
    </div>
);
  
}