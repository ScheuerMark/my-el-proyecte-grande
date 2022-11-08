import React, { useReducer } from 'react';
import {postComment, getComments, fetchPosts} from './ApiRequest';



const formReducer = (state, event) => {
    return{
        ...state,
        [event.name]: event.value
    }
}

export function CommentForm(props) {
    const [comment, setComment] = useReducer(formReducer, {});


    const handleSubmit = (e) => {
        e.preventDefault();
        postComment(comment, props.id).then(x => {
            getComments(props.id).then(data => props.update(data))
        });
    };

    const handleChange = event => {
        setComment({
            name: event.target.name,
            value: event.target.value,
        });
    }

    return (
        <div>
            <div className="text-end">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add new comment
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New comment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label>Message:</label>
                                <textarea className="form-control" name="message" id="postMessage" cols="30" rows="10"
                                          value={setComment.message}
                                          onChange={handleChange}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Send comment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
