import React, { Component } from 'react';

export class Topic extends Component {
    render() {
      return (
        <div className="card">
            <div className="card-header">
                <h5 className="w-75 d-inline-flex"><a className=" w-100 text-black text-decoration-none">{this.props.data.title}</a></h5>
                <span className="float-end post-count fst-italic">{this.props.data.numberOfPosts}</span>
            </div>
            <div className="card-body row">
                <div className="col-9">
                    <p className="card-text">{this.props.data.description}</p>
                </div>
                <div className="col-3 d-flex flex-column">
                    <a className="fst-italic mt-auto ms-auto text-black">view posts</a>
                </div>
            </div>
        </div>
      );
    }
  }

export default Topic;