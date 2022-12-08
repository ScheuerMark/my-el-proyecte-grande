import React, { Component, useEffect, useState } from 'react';
import {  useParams } from "react-router-dom";
import {PostForm} from "../PostForm";
import Post from '../Shared/Post';
import { fetchPosts } from '../ApiRequest';
import { useRef } from 'react';


export function TopicDetails (){
    const [posts, setPosts] = useState([{id: "-1"},{id: "-2"},{id: "-3"}]);

    const params = useParams();
    const prevParams = useRef();

    useEffect(()=>{
        fetchPosts(params.title).then(data => setPosts(data));
    },[])

    useEffect(()=>{
        console.log(params)
        prevParams.current = params;
        if(prevParams.current?.params?.title !== params?.title){
            setPosts([{id: "-1"},{id: "-2"},{id: "-3"}])
            fetchPosts(params.title).then(data => setPosts(data));
        }
    },[params.title])

        return (
            <main role="main" className="pb-3">
                <div >
	                <div className="row">
		                <h1 className="text-center">{params.title}</h1>
		                <div className="col-12">
                            {posts.map((element, index) => <Post key={element.id} post={element} update={setPosts} title={params.title}/>)}
		                </div>
	                </div>
                    {}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal">
                        Add new post
                    </button>
                    <PostForm title={params.title} update={setPosts}/>
                </div>
            </main>    
        );
      
}
