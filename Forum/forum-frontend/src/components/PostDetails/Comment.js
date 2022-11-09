import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Highlight from 'react-highlight-words';


export function Comment(props) {

    const like = <FontAwesomeIcon icon={faThumbsUp} />;
    const dislike = <FontAwesomeIcon icon={faThumbsDown} />;
    const date = new Date(props.data.dateTime).toLocaleString();


    function likeComment(){
        fetch(`/api/Home/Like/${props.data.id}`, {
            method: 'PUT',
        });
        props.data.like++;
    }


    function disLikeComment(){
        fetch(`/api/Home/DisLike/${props.data.id}`, {
            method: 'PUT',
        });
        props.data.disLike++;
    }

return (
    <div class="card">
        <div class="card-header">
            <h5 class="d-inline">Username</h5>
            <span class="float-end  fst-italic">{date}</span>
        </div>
    <div class="card-body row" >
        <div class="col-12">
            <p class="card-text">
            <Highlight searchWords={[props.searchPhrase]}
            textToHighlight={`${props.data.message}`}>                       
            </Highlight>
            </p>
        </div>
        <div class="col-12 d-flex flex-column">
            <span class="fst-italic mt-auto ms-auto">
                <Link onClick={likeComment} class="align-middle text-decoration-none text-black me-3">{like} {props.data.like}</Link>
                <Link onClick={disLikeComment} class="align-middle text-decoration-none text-black">{dislike} {props.data.disLike} </Link>
            </span>
        </div>
    </div>
    </div>
);
  
}