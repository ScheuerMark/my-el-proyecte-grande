import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getSearched } from "../ApiRequest";

export function Search(props)
{
    const [posts,setPosts] = useState();
    const params = useParams();

    useEffect(()=>{
        getSearched(params.searchPhrase).then(data=> {
            setPosts(data);
        })
    },[])

    return(
        
    )
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
                    </div>                    
                </div>
            </div>                         
    );
}