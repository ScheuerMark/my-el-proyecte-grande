import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import { NavMenu } from './NavMenu';

export class Layout extends Component {

  render() {
    return (
      <div>
         <NavMenu/> 
        <Outlet />      
      </div>
    );
  }
}

export default Layout;