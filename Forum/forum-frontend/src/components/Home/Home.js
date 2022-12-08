import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import Post from '../Shared/Post';
import Topic from '../Shared/Topic';
import { getTopics, getPostByDateDesc } from '../ApiRequest';
import { UserContext } from '../../App';

function Home() {
    let [topics, setTopics] = useState([{id: "-1"},{id: "-2"},{id: "-3"}]);
    let [posts, setPosts] = useState([{id: "-1"},{id: "-2"},{id: "-3"},{id: "-4"}]);

    const userContext = useContext(UserContext);

    useEffect(()=>{
        getTopics().then(data => {
            setTopics(data);
            console.log(data);
        })
        getPostByDateDesc().then(data => {
            setPosts(data);
        });
        
    }, [])
    useEffect(()=>{
        console.log(userContext);
    },[userContext])

    return (
        <div>
            <div className="row">
                <div className="col-xl-6 col-lg-12 column1">
                    <h1>Topics</h1>
                    {topics.map((topic, index) => <Topic key={topic.id} topic={topic} update={setTopics}/>)}
                </div>
                <div className="col-xl-6 d-xl-block d-none">
                    <h1>Recent posts</h1>
                    {posts.map((post, index) => <Post key={post.id} post={post} update={setPosts} title={null}/>)}
                </div>
            </div>		
        </div>
    )
}
  
export default Home;