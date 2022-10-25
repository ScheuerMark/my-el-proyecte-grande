import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    render() {
      return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
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
                                <Link className="nav-link text-dark" to="/Topic">Test</Link>                               
                            </li>
                            <li className="nav-item">
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button">Topics</a>
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
                            <li>
                            </li>
                        </ul>                      
                    </div>
                    <form className="d-flex">
                            <input className="form-control me-6" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                </div>
            </nav>
        </header>
      );
    }
  }