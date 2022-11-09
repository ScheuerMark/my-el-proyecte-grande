import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getSearched } from "../ApiRequest";
import { PostDetailsView } from '../PostDetails/PostDetailsView';

export function Search()
{
    const [posts,setPosts] = useState(
        [
            {
                comments:[],
            }
        ]   
    );
    const params = useParams();

    useEffect(()=>{
        getSearched(params.searchPhrase).then(data=> {
            setPosts(data);
            
        })
    },[params.searchPhrase])

    return(      
        <div>
            <h1 className='text-center'>Search Result</h1>
            {posts.map((element, index) =>(
                <div key={index} className='mb-5 p-1 bg-secondary rounded bg-gradient' style={{"--bs-bg-opacity": ".5"}}>
                    {PostDetailsView(element, null, params.searchPhrase)}
                </div>
            )
            )}
        </div>
    )
}

