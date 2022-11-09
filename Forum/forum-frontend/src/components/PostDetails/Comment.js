import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export function Comment({comment}) {

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
    <div class="card">
        <div class="card-header">
            <h5 class="d-inline">Username</h5>
            <span class="float-end  fst-italic">{date}</span>
        </div>
    <div class="card-body row" >
        <div class="col-12">
            <p class="card-text">{comment.message}</p>
        </div>
        <div class="col-12 d-flex flex-column">
            <span class="fst-italic mt-auto ms-auto">
                <Link onClick={likeComment} class="align-middle text-decoration-none text-black me-3">{like} {comment.like}</Link>
                <Link onClick={disLikeComment} class="align-middle text-decoration-none text-black">{dislike} {comment.disLike} </Link>
            </span>
        </div>
    </div>
    </div>
);
  
}