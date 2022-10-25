import { data } from 'jquery';
import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import { NavMenu } from './NavMenu';

export class Layout extends Component {

  render() {
    return (
      <div>
         <NavMenu/> 
         <div className='container'>
            <Outlet />   
        </div>   
      </div>
    );
  }
}

export default Layout;