import React, { Component } from 'react';

export class Topic extends Component {
    render() {
      return (
        <div class="card">
            <div class="card-header">
                <h5 class="w-75 d-inline-flex"><a class=" w-100 text-black text-decoration-none">Valami </a></h5>
                <span class="float-end post-count fst-italic">Hello</span>
            </div>
            <div class="card-body row">
                <div class="col-9">
                    <p class="card-text">asdasd </p>
                </div>
                <div class="col-3 d-flex flex-column">
                    <a class="fst-italic mt-auto ms-auto text-black">asd</a>
                </div>
            </div>
        </div>
      );
    }
  }

export default Topic;