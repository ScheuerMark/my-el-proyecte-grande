//#region Post

/*=====================================================*/
/*                       Post                          */
/*=====================================================*/

//#region /*===  GET  ===*/

export function fetchPosts(title){
    return fetch(`/api/Home/Posts/${title}`)
        .then((response) => response.json())
}

export function getPostByDateDesc(){
    return fetch('api/Home/Posts/Date/Desc')
        .then((response) => response.json());
}

export function getPostById(postId){
    return fetch(`/api/Home/PostDetails/${postId}`)
        .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

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
//#endregion

//#region /*=== Update ===*/
export function updatePost(body, postId){
    let formData = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Home/PostDetails/${postId}`
    
    return fetch(url, formData)
        .then((response) => response.ok);
}
//#endregion

//#endregion

//#region Topic
/*=====================================================*/
/*                       Topic                         */
/*=====================================================*/

//#region /*===  GET  ===*/

export function getTopicTitles(){
    return fetch('/api/Home/Topics/Titles')
    .then((response) => response.json());
}

export function getTopics(){
    return fetch('api/Home/Topics')
        .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

//#endregion

//#endregion

//#region Comment
/*=====================================================*/
/*                       Comment                       */
/*=====================================================*/

//#region /*===  GET  ===*/

export function getComments(postId){
    return fetch(`/api/Home/PostDetails/${postId}`)
    .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

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
//#endregion

//#region Update
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
//#endregion

//#endregion

//#region User
/*=====================================================*/
/*                       User                          */
/*=====================================================*/

//#region /*===  GET  ===*/

//#endregion

//#region /*===  Post  ===*/

//#endregion

//#endregion

//#region Admin
/*=====================================================*/
/*                       Admin                         */
/*=====================================================*/

//#region /*===  GET  ===*/

//#endregion

//#region /*===  Post  ===*/

//#endregion

//#endregion

//#region Other
/*=====================================================*/
/*                       Other                         */
/*=====================================================*/

//#region /*===  GET  ===*/

export function getSearched(searchPhrase){
    return fetch(`/api/Home/Search/${searchPhrase}`)
    .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

//#endregion

//#endregion








export function updateTopic(body, topicId){
    let formData = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Home/Topics/${topicId}`

    return fetch(url, formData)
        .then((response) => response.ok);
}

export function getCommentById(commentId){
    return fetch(`/api/Home/Comment/${commentId}`)
        .then((response) => response.json());
}

export function getTopicById(topicId) {
    return fetch(`/api/Home/Topics/${topicId}`)
        .then((response) => response.json());
}

export function postLogin(body){
    let formData = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Account/Login`
    return fetch(url, formData)
        .then((response) => response.ok);
}

export function getLoggedInUser() {
        return fetch(`/api/Account/LoggedIn`)
        .then((response) =>response)       
}

export function getLogout() {
    return fetch(`/api/Account/Logout`)
    .then((response) =>response.ok)       
}

export function getAllUser(){
    return fetch(`/api/Admin`)
    .then((response) => response.json());
}


/*=====================================================*/
/*                       Post                          */
/*=====================================================*/

/*===  GET  ===*/

/*===  Post  ===*/

export function postRegister(body){
    let formData = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `/api/Admin/Registration`
    return fetch(url, formData)
        .then((response) => response.ok);
}