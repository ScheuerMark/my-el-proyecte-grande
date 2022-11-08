import React, { Component, useEffect, useState } from 'react';
import {  useParams } from "react-router-dom";
import { Comment } from './Comment';
import { getComments } from '../ApiRequest';
import { CommentForm } from '../CommentForm';

export function PostDetails (props) {
    const [post, setPost] = useState(
        {
            id:"",
            comments:[],
        }
    );
    const params = useParams();

    useEffect(()=>{
        getComments(params.id).then(data => {
            setPost(data);
        });
    },[])

    return (
        <div className="row">
        <div className="col-xl-10 col-lg-12">
            <Post key={post.id} data={post} update={setPost}/>
            <br/>
        </div> 
        <div className="col-xl-9 col-lg-11">
            {post.comments.map((element, index) => <Comment key={index} data={element}/> )}
        </div>
        </div>
        
    );
}


function Post (props){
    const [date,setDate] = useState(new Date(props.data.dateTime).toLocaleString());
    const [isOpen, setIsOpen] = useState(false);
    return (                           
            <div className="card">
                <div className="card-header">
                    <h5 className="d-inline-flex">{props.data.title}</h5>
                    <span className="float-end  fst-italic">{date}</span>
                    <br/>
                    <span className="fst-italic">Username</span>                     
                </div>
                <div className="card-body row">
                    <div className="col-xl-9 col-lg-12">
                        <p className="card-text">{props.data.message}</p>
                    </div>
                    <div className="col-12 d-flex flex-column">
                        <div className="text-end">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add new comment
                            </button>
                        </div>
                        <CommentForm update={props.update} id={props.data.id}></CommentForm>
                    </div>                    
                </div>
            </div>                         
    );
}
