import React, { useEffect, useState } from 'react';
import './Home.css';
import Post from '../Shared/Post';
import Topic from '../Shared/Topic';
import { getTopics, getPostByDateDesc } from '../ApiRequest';

function Home() {
    let [topics, setTopics] = useState([]);
    let [posts, setPosts] = useState([]);

    useEffect(()=>{
        getTopics().then(data => {
            setTopics(data);
        })
        getPostByDateDesc().then(data => {
            setPosts(data);
        });
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-xl-6 col-lg-12 column1">
                    <h1>Topics</h1>
                    {topics.map((topic, index) => <Topic key={index} topic={topic} update={setTopics}/>)}
                </div>
                <div className="col-xl-6 d-xl-block d-none">
                    <h1>Recent posts</h1>
                    {posts.map((post, index) => <Post key={index} post={post} update={setPosts} title={null}/>)}
                </div>
            </div>		
        </div>
    )
}
  
export default Home;