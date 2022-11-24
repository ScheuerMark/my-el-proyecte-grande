import React, { Component, useContext, useEffect, useState } from 'react';
import { Comment } from './Comment';
import { CommentForm } from '../CommentForm';
import Highlight from 'react-highlight-words';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {EditModalPost} from "../EditModals";
import { UserContext } from '../../App';




export function PostDetailsView({post, setPost, searchPhrase=null}){
    return (
        <div className="row">
        <div className="col-xl-10 col-lg-12">
            <Post key={post.id} data={post} searchPhrase={searchPhrase} update={setPost}/>
            <br/>
        </div> 
        <div className="col-xl-9 col-lg-11">
            {post.comments.map((element, index) => <Comment searchPhrase={searchPhrase} key={index} comment={element} setPost={setPost} post={post} />)}
        </div>
        </div>   
    );
}

function Post (props){
    const trash = <FontAwesomeIcon icon={faTrash} />;
    const [date,setDate] = useState(new Date(props.data.dateTime).toLocaleString());
    let button;
    const navigate = useNavigate();
    const userContext = useContext(UserContext);


    if(props.update != null){
        button=(<div className="col-12 d-flex flex-column">
            <div className="text-end">
                <button type="button" className={`btn ${userContext.user === null ? "disabled" : ""} btn-primary`} data-bs-toggle="modal" data-bs-target="#commentModal">
                    Add new comment
                </button>
            </div>
            <EditModalPost update={props.update} title={props.data.title} message={props.data.message} id={props.data.id} />
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

    function deletePost(post, setPost){
        fetch(`/api/Home/DeletePost/${post.id}`, {
            method: 'DELETE'
        }).then((response) => response.ok).then(x => setPost({
            id:"",
            comments:[],
        })).then(x => navigate("/"));
    }

    return (                           
            <div className="card">
                <div className="card-header">
                    <h5 className="d-inline-flex">{props.data.title}</h5>
                    <span className="float-end  fst-italic">
                    {userContext.user?.id === props.data?.user?.id ?
                     (
                    <>
                        <button type="button" className="btn btn-primary-outline" data-bs-toggle="modal"
                        data-bs-target="#editPostModal">
                        <FontAwesomeIcon icon={faEdit}/>
                        </button>
                        <Link onClick={()=>deletePost(props.data, props.update)} class="align-middle text-decoration-none text-black me-3">{trash}</Link>
                    </>
                 ) : ""}

                        {date}
                    </span>
                    <br/>
                    <span className="fst-italic">{props.data?.user?.userName}</span>                     
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