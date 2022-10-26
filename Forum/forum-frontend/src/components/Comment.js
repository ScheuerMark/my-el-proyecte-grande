import React, { Component } from 'react';

export class Comment extends Component {

  render() {
    return (
        <div class="card">
            <div class="card-header">
                <h5 class="d-inline">Username</h5>
                <span class="float-end  fst-italic">2022-10-11 14:35</span>
            </div>
        <div class="card-body row" >
            <div class="col-12">
                <p class="card-text">{this.props.data.message}</p>
            </div>
            <div class="col-12 d-flex flex-column">
                <span class="fst-italic mt-auto ms-auto">
                    <a class="align-middle text-decoration-none text-black">12 </a>
                    <a class="align-middle text-decoration-none text-black"> 0</a>
                </span>
            </div>
        </div>
        </div>
    );
  }
}