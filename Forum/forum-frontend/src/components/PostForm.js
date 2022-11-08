import React, { useReducer } from 'react';
import { fetchPosts } from './ApiRequest';
import { postPost } from './ApiRequest';

const formReducer = (state, event) => {
    return{
        ...state,
        [event.name]: event.value
    }
}

export function PostForm(props){
    const [post, setPost] = useReducer(formReducer, {});
    
    
    
    const HandleSubmit = (e) =>{
        e.preventDefault();
        postPost(post, props.title).then(x=> {
        fetchPosts(props.title).then(data => props.update(data))});
    };

    const handleChange = event => {
        setPost({
            name: event.target.name,
            value: event.target.value,
        });
    }
    

    return (
        <div className="mt-3">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add new post
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={HandleSubmit}>
                            <div className="modal-body">

                                <label>Title:</label>
                                <input type="text" className="form-control" name="title" value={setPost.title} onChange={handleChange}/>
                                <br/>
                                <label>Message:</label>
                                <textarea className="form-control" name="message" id="postMessage" cols="30" rows="10" value={setPost.message}
                                          onChange={handleChange}></textarea>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Send post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
