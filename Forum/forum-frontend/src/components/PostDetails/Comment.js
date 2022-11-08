import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


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
    <div className="card">
        <div className="card-header">
            <h5 className="d-inline">Username</h5>
            <span className="float-end  fst-italic">{date}</span>
        </div>
    <div className="card-body row" >
        <div className="col-12">
            <p className="card-text">{props.data.message}</p>
        </div>
        <div className="col-12 d-flex flex-column">
            <span className="fst-italic mt-auto ms-auto">
                <Link onClick={likeComment} className="align-middle text-decoration-none text-black me-3">{like} {props.data.like}</Link>
                <Link onClick={disLikeComment} className="align-middle text-decoration-none text-black">{dislike} {props.data.disLike} </Link>
            </span>
        </div>
    </div>
    </div>
);
  
}