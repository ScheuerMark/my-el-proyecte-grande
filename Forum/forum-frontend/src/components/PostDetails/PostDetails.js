import React, { useEffect, useState } from 'react';
import {  useParams } from "react-router-dom";
import { getComments } from '../ApiRequest';
import { PostDetailsView } from './PostDetailsView';
import { CommentForm } from '../CommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {EditModalPost} from "../EditModals";

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
        <PostDetailsView post={post} setPost={setPost}/>      
    );
}


function Post (props){
    const [date,setDate] = useState(new Date(props.data.dateTime).toLocaleString());
    
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
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#editPostModal">
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <EditModalPost update={props.update} title={props.data.title} message={props.data.message} id={props.data.id} />
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
                                Add new comment
                            </button>
                        </div>
                        <CommentForm update={props.update} id={props.data.id}></CommentForm>
                    </div>                    
                </div>
            </div>                         
    );
}
