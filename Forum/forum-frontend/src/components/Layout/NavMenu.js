import { event } from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { getTopicTitles } from '../ApiRequest';
import { ThemeContext, UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';


export const NavMenu = () => {
    let [topicsTitles, setTopicsTitles] = useState([]);
    let [searchPhrase, setsearchPhrase] = useState("");
    let [userLink, setUserLink] = useState("");
    const navigate = useNavigate();

    const context = useContext(ThemeContext);
    const userContext = useContext(UserContext);

    useEffect(()=>{
        getTopicTitles().then(data => {
            setTopicsTitles(data);
        })
        userContext.refreshUser();
        console.log(userContext)
    }, []);

    useEffect(()=>{
        if(userContext)
            setUserLink(
                <li className="nav-item me-5">
                <Link className="nav-link text-dark" to="/">{userContext?.user?.userName}</Link>                               
                </li>
            )  
    },[userContext])



    function handelChange(e){
        if(e.key=="Enter")
            navigateSearch(e.target.value);
        setsearchPhrase(e.target.value);
        //navigateSearch(e.target.value);
    }


    

    function navigateSearch(Phrase){
        if(Phrase != "")
            navigate(`/Search/${Phrase}`);
        else
            navigate(`/`);
    }
    return (
        <header>
                <nav className="navbar px-md-5 navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Forum{userContext?.user?.userName}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item">
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button">Topics</a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {topicsTitles.map((title, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link className="dropdown-item" role="button" to={`/Posts/${title}`}>{title}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li className="nav-item  ms-md-5">
                                    <a onClick={context.toggleTheme} className="btn btn-outline-secondary">{context.icon}</a>                              
                                </li>
                                <li className="nav-item ms-md-auto">
                                    <Link className="nav-link text-dark" to="/Login">Login</Link>                               
                                </li>
                                <li className="nav-item me-5">
                                    <Link className="nav-link text-dark" to="/Register">Register</Link>                               
                                </li>
                                <li className="nav-item me-5 d-flex">
                                    <input className="form-control me-3" onKeyDown={handelChange} minLength="1" value={searchPhrase} onChange={handelChange} type="search" placeholder="Search" aria-label="Search"></input>
                                    <button onClick={() => navigateSearch(searchPhrase)} className="btn btn-outline-success" >Search</button>                            
                                </li>
                                {userLink}
                            </ul>                      
                        </div>
                    </div>
                </nav>
            </header>
  )
}
