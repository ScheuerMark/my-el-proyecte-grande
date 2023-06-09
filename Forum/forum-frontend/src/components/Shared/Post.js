import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCommentDots, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Post.css'
import { fetchPosts, getPostByDateDesc } from '../ApiRequest';
import { UserContext } from '../../App';

const Post = ({post, update, title}) => {
  const commentIcon = <FontAwesomeIcon icon={faCommentDots} />;
  const collapsedIcon = <FontAwesomeIcon className='text-collapsed' icon={faAngleDown} />;
  const expandedIcon = <FontAwesomeIcon  className='text-expanded' icon={faAngleUp} />;
  const trash = <FontAwesomeIcon icon={faTrash} />;

  const userContext = useContext(UserContext);

  function deletePost(post, update, title){
    fetch(`/api/Home/DeletePost/${post.id}`, {
        method: 'DELETE'
    }).then((response) => response.ok).then(x=> {
      if(title !== null){
        fetchPosts(title).then(data => update(data));
      }else{
        getPostByDateDesc().then(data => update(data));
      }
    });
  }

  useEffect(()=>{
    console.log(userContext)
},[userContext])

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="w-75 d-inline-flex"><Link className=" w-100 text-black text-decoration-none" to={`/PostDetail/${post.id}`}>{post.title}</Link></h5>
        
        <span className="float-end post-count fst-italic">{post.numberOfComments} {commentIcon}    
          <button className="btn-sm btn-outline-dark text-toogle" type="button" data-bs-toggle="collapse" data-bs-target={`#id${post.id}`} aria-expanded="false" aria-controls={`id${post.id}`}>
                    {collapsedIcon}
                    {expandedIcon}</button>
                    
            </span>
      </div>
      <div className="collapse" id={`id${post.id}`}>
            <div className="card-body row" >
            <div className="col-9">
              <p className="card-text">{post.message}</p>
            </div>
            <div className="col-3 d-flex flex-column">
            {(post?.user?.id != null && userContext.user?.id === post?.user?.id) || userContext.roles?.includes("Admin") ?  <Link onClick={()=>deletePost(post, update, title)} class="ms-auto float-end text-decoration-none text-black me-3">{trash}</Link> : "" }
              <Link className="fst-italic mt-auto text-black ms-auto" to={`/PostDetail/${post.id}`}>view comments</Link>
              
            </div>
          </div>
      </div>
    </div>
  )
}

export default Post