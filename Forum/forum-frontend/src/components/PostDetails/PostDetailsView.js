import React, { Component, useEffect, useState } from 'react';
import { Comment } from './Comment';
import { CommentForm } from '../CommentForm';
import Highlight from 'react-highlight-words';
import { Link } from 'react-router-dom';

export function PostDetailsView({post, setPost, searchPhrase=null}){
    return (
        <div className="row">
        <div className="col-xl-10 col-lg-12">
            <Post key={post.id} data={post} searchPhrase={searchPhrase} update={setPost}/>
            <br/>
        </div> 
        <div className="col-xl-9 col-lg-11">
            {post.comments.map((element, index) => <Comment searchPhrase={searchPhrase} key={index} comment={element} post={post} setPost={setPost}/> )}
        </div>
        </div>   
    );
}

function Post (props){
    const [date,setDate] = useState(new Date(props.data.dateTime).toLocaleString());
    let button;
    if(props.update != null){
        button=(<div className="col-12 d-flex flex-column">
        <CommentForm update={props.update} id={props.data.id}></CommentForm>
        </div>)
    }else{
        button=(<div className="col-12 d-flex flex-column">
            <div className="text-end">
                <Link to={`/PostDetail/${props.data.id}`}>
            <button type="button" className="btn btn-primary">
                More
            </button>
            </Link>
            </div>
        </div>)
    }

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
                        <p className="card-text">
                        <Highlight searchWords={[props.searchPhrase]}
                        textToHighlight={`${props.data.message}`}>                       
                        </Highlight>
                        </p>
                    </div>
                    {button}                
                </div>
            </div>                         
    );
}