import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    render() {
      return (
        <header>
            <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div class="container-fluid">
                    <a class="navbar-brand" asp-controller="Home" asp-action="Index">Forum</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul class="navbar-nav flex-grow-1">
                            <li class="nav-item">
                                <Link class="nav-link text-dark" to="/">Home</Link>                               
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link text-dark" to="/Topic">Test</Link>                               
                            </li>
                            <li class="nav-item">
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button">Topics</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" role="button">Some useful stuff</a>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item" type="button">Medical providers</button></li>
                                    <li><button class="dropdown-item" type="button">List of nurseries</button></li>
                                    <li><button class="dropdown-item" type="button">List of schools</button></li>
                                    <li><button class="dropdown-item" type="button">List of Adventure parks</button></li>
                                </ul>
                            </li>
                            <li>
                                <partial name="_LoginPartial"/>
                            </li>
                        </ul>
                        
                    </div>
                    <form class="d-flex">
                            <input class="form-control me-6" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                </div>
            </nav>
        </header>
      );
    }
  }