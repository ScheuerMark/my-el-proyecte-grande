import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class NavMenu extends Component {

    constructor(props) { 
        super(props); 
        this.state = {
            topicsTitles: []
        }; 
    }

    componentDidMount() {
        fetch('/api/Home/Topics/Titles')
        .then((response) => response.json())
        .then(data => {
            this.setState({ topicsTitles: data });
        });
    }

    renderTopics(){
        let topicsTitles = [];
        this.state.topicsTitles.forEach(title => {
            topicsTitles.push(
                <li key={title}>
                    <Link className="dropdown-item" role="button" to={`/Posts/${title}`}>{title}</Link>
                </li>
            )
        })
        return topicsTitles;
    }

    render() {
      return (
        <header>
            <nav className="navbar px-md-5 navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" asp-controller="Home" asp-action="Index">Forum</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">Home</Link>                               
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/PostDetail/1">Test</Link>                               
                            </li>
                            <li className="nav-item">
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button">Topics</a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {this.renderTopics()}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button">Some useful stuff</a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button className="dropdown-item" type="button">Medical providers</button></li>
                                    <li><button className="dropdown-item" type="button">List of nurseries</button></li>
                                    <li><button className="dropdown-item" type="button">List of schools</button></li>
                                    <li><button className="dropdown-item" type="button">List of Adventure parks</button></li>
                                </ul>
                            </li>
                            <li className="nav-item ms-md-auto">
                                <Link className="nav-link text-dark" to="/Login">Login</Link>                               
                            </li>
                            <li className="nav-item me-5">
                                <Link className="nav-link text-dark" to="/Register">Register</Link>                               
                            </li>
                            <li className="nav-item me-5">
                            <form className="d-flex">
                            <input className="form-control me-6" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>                               
                            </li>
                        </ul>                      
                    </div>

                </div>
            </nav>
        </header>
      );
    }
  }