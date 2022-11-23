import { event } from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { getLogout, getTopicTitles } from '../ApiRequest';
import { ThemeContext, UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';


export const NavMenu = () => {
    let [topicsTitles, setTopicsTitles] = useState([]);
    let [searchPhrase, setsearchPhrase] = useState("");
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
                        <Link className="navbar-brand" to="/">Forum</Link>
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
                                <li className="nav-item me-md-5 mx-md-auto  d-flex">
                                    <input className="form-control me-3" onKeyDown={handelChange} minLength="1" value={searchPhrase} onChange={handelChange} type="search" placeholder="Search" aria-label="Search"></input>
                                    <button onClick={() => navigateSearch(searchPhrase)} className="btn btn-outline-success" >Search</button>                            
                                </li>                                                         
                                <li className={`nav-item ms-md-auto ${userContext.user !== null? "d-none": ""}`}>
                                <Link className="nav-link text-dark" to="/Login">Login</Link>                               
                                </li>
                                <li className={`nav-item me-5 ${userContext.user !== null? "d-none": ""}`}>
                                <Link className="nav-link text-dark" to="/Register">Register</Link>                               
                                </li>

                                <li className={`nav-item dropdown-menu-right ms-md-auto  dropdown ${userContext.user === null? "d-none": ""}`}>
                                    <a className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button"><FontAwesomeIcon icon={faUser}/></a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li><Link className="dropdown-item" role="button" to="/">Profile</Link></li>
                                    <li><Link className="dropdown-item" role="button" onClick={()=>{getLogout().then(x=> userContext.refreshUser())}}>Logout</Link></li>
                                    <li><Link className="dropdown-item" role="button" to="/">AdminPage</Link></li>
                                    </ul>
                                </li>
                            </ul>                      
                        </div>
                    </div>
                </nav>
            </header>
  )
}
