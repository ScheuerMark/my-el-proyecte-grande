import React, { Component, useEffect, useState } from 'react';
import {  useParams } from "react-router-dom";
import { getComments } from '../ApiRequest';
import { PostDetailsView } from './PostDetailsView';

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
        PostDetailsView(post,setPost)       
    );
}


