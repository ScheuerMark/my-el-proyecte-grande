export function fetchPosts(title){
    return fetch(`/api/Home/Posts/${title}`)
        .then((response) => response.json())
}

export function postPost(body, topicTitle){
    let formData = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Home/Posts/${topicTitle}`
    return fetch(url, formData)
        .then((response) => response.ok);
}

export function getTopicTitles(){
    return fetch('/api/Home/Topics/Titles')
    .then((response) => response.json());
}

export function postComment(body, postId){
    let formData = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Home/PostDetails/${postId}`
    return fetch(url, formData)
        .then((response) => response.ok);
}

export function getComments(postId){
    return fetch(`/api/Home/PostDetails/${postId}`)
    .then((response) => response.json());
}

export function getSearched(searchPhrase){
    return fetch(`/api/Home/Search/${searchPhrase}`)
    .then((response) => response.json());
}

export function getTopics(){
    return fetch('api/Home/Topics')
        .then((response) => response.json());
}

export function getPostByDateDesc(){
    return fetch('api/Home/Posts/Date/Desc')
        .then((response) => response.json());
}

export function updatePost(body, postId){
    let formData = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Home/PostDetails/${postId}`
    console.log(formData);
    console.log(url)
    return fetch(url, formData)
        .then((response) => response.ok);
}

export function updateComment(body, commentId){
    let formData = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Home/Comments/${commentId}`
    return fetch(url, formData)
        .then((response) => response.ok);
}

export function getPostById(postId){
    return fetch(`/api/Home/PostDetails/${postId}`)
        .then((response) => response.json());
}