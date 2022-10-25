import React, { Component } from 'react';
import './Home.css';
import Topic from './Topic';


export class Home extends Component {

    render() {
      return (
    <div>
        <div class="row">
            <div class="col-xl-6 col-lg-12 column1">
                <h1>Topics</h1>
                <Topic></Topic>
            </div>
            <div class="col-xl-6 d-xl-block d-none">
                <h1>Recent posts</h1>
                </div>
        </div>		
    </div>
      );
    }
  }
  
  export default Home;