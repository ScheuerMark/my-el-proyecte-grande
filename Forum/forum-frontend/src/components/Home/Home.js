import React, { Component, useEffect, useState } from 'react';
import './Home.css';
import { Post } from '../Shared/Post';
import Topic from '../Shared/Topic';

function Home() {
    let [topics, setTopics] = useState([]);
    let [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch('api/Home/Topics')
        .then((response) => response.json())
        .then(data => {
            setTopics(data);
        })
        fetch('api/Home/Posts/Date/Desc')
        .then((response) => response.json())
        .then(data => {
            setPosts(data);
        });
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-xl-6 col-lg-12 column1">
                    <h1>Topics</h1>
                    {topics.map((topic, index) => <Topic key={index} data={topic} />)}
                </div>
                <div className="col-xl-6 d-xl-block d-none">
                    <h1>Recent posts</h1>
                    {posts.map((post, index) => <Post key={index} data={post} />)}
                </div>
            </div>		
        </div>
    )
}
  
export default Home;