import React, {useReducer, useState} from 'react';

import {
    fetchPosts,
    getCommentById,
    getComments,
    getPostById,
    getTopics,
    updateComment,
    updatePost,
    updateTopic
} from "./ApiRequest";

const formReducer = (state, event) => {
    return{
        ...state,
        [event.name]: event.value
    }
}

export function EditModalPost(props) {
    const [post, setPost] = useReducer(formReducer, {
        "title": props.title,
        "message": props.message
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        updatePost(post, props.id).then(x=> {
            getPostById(props.id).then(data => props.update(data))});
    };

    const handleChange = event => {
        setPost({
            name: event.target.name,
            value: event.target.value,
        });
    }
        return (
            <>              
               
                <div className="modal fade" id="editPostModal" tabIndex="-1" aria-labelledby="editPostModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editPostModalLabel">Edit post</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                    <label>Title:</label>
                                    <input type={"text"} className="form-control" name="title"  defaultValue={post.title} 
                                           value={setPost.title} onChange={handleChange}/>
                                    <br/>
                                    <label>Message:</label>
                                    <textarea className="form-control" name="message" id="postMessage" cols="30" rows="10"
                                              defaultValue={post.message} value={setPost.message} onChange={handleChange}></textarea>
                                    </div>
                                                           
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

export function EditModalComment(props) {
    
    const [comment, setComment] = useReducer(formReducer, {
        "id": props.comment.id,
        "message": props.comment.message
    });
    
    
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        updateComment(comment, comment.id).then(x=> {
            getCommentById(comment.id).then(data => props.update(data))});
       };

    const handleChange = event => {
        setComment({
            name: event.target.name,
            value: event.target.value,
        });
    }
    return (
        <>

            <div className="modal fade" id={`editCommentModal${comment.id}`} tabIndex="-1" aria-labelledby="editCommentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editCommentModalLabel">Edit comment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                                                           
                                <label>Message:</label>
                                <textarea className="form-control" name="message" id="commentMessage" cols="30" rows="10"
                                          defaultValue={comment.message} value={setComment.message} onChange={handleChange}></textarea>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export function EditModalTopic(props) {
    const [topic, setTopic] = useReducer(formReducer, {
        "id": props.id,
        "title": props.title,
        "description": props.description
    });


    const handleSubmit = (e) =>{
        e.preventDefault();
        updateTopic(topic, props.id).then(x=> {
            getTopics().then(data => props.update(data))});
    };

    const handleChange = event => {
        setTopic({
            name: event.target.name,
            value: event.target.value,
        });
    }
    return (
        <>

            <div className="modal fade" id="editTopicModal" tabIndex="-1" aria-labelledby="editTopicModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editTopicModalLabel">Edit topic</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label>Title:</label>
                                <input type={"text"} className="form-control" name="title" id={"topicTitle"}  defaultValue={topic.title}
                                       value={setTopic.title} onChange={handleChange}/>
                                <br/>

                                <label>Description:</label>
                                <textarea className="form-control" name="description" id="topicDescription" cols="30" rows="10"
                                          defaultValue={topic.description} value={setTopic.description} onChange={handleChange}></textarea>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}