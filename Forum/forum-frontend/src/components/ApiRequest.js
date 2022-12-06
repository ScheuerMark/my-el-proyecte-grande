//#region Post

/*=====================================================*/
/*                       Post                          */
/*=====================================================*/

//#region /*===  GET  ===*/

export function fetchPosts(title){
    return fetch(`https://localhost:7021/api/Home/Posts/${title}`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
        .then((response) => response.json())
}

export function getPostByDateDesc(){
    return fetch('https://localhost:7021/api/Home/Posts/Date/Desc',{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
        .then((response) => response.json());
}

export function getPostById(postId){
    return fetch(`https://localhost:7021/api/Home/PostDetails/${postId}`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
        .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

export function postPost(body, topicTitle){
    let formData = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Home/Posts/${topicTitle}`
    return fetch(url, formData)
        .then((response) => response.ok);
}
//#endregion

//#region /*=== Update ===*/
export function updatePost(body, postId){
    let formData = {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Home/PostDetails/${postId}`
    
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
    return fetch('https://localhost:7021/api/Home/Topics/Titles',{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json());
}

export function getTopics(){
    return fetch('https://localhost:7021/api/Home/Topics',{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
        .then((response) => response.json());
}

export function getTopicById(topicId) {
    return fetch(`https://localhost:7021/api/Home/Topics/${topicId}`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
        .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

//#endregion

//#region Update
export function updateTopic(body, topicId){
    let formData = {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Home/Topics/${topicId}`

    return fetch(url, formData)
        .then((response) => response.ok);
}
//#endregion

//#endregion

//#region Comment
/*=====================================================*/
/*                       Comment                       */
/*=====================================================*/

//#region /*===  GET  ===*/

export function getComments(postId){
    return fetch(`https://localhost:7021/api/Home/PostDetails/${postId}`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json());
}

export function getCommentById(commentId){
    return fetch(`https://localhost:7021/api/Home/Comment/${commentId}`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
        .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

export function postComment(body, postId){
    let formData = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Home/PostDetails/${postId}`
    return fetch(url, formData)
        .then((response) => response.ok);
}
//#endregion

//#region Update
export function updateComment(body, commentId){
    let formData = {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Home/Comments/${commentId}`
    return fetch(url, formData)
        .then((response) => response.ok);
}
//#endregion

//#endregion

//#region User
/*=====================================================*/
/*                       Account                       */
/*=====================================================*/

//#region /*===  GET  ===*/
export function getLoggedInUser() {
    return fetch(`https://localhost:7021/api/Account/LoggedIn`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) =>response)       
}

export function getRoles() {
    return fetch(`https://localhost:7021/api/Account/Roles`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) =>response.json())       
}

export function getLogout() {
    return fetch(`https://localhost:7021/api/Account/Logout`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) =>response.ok)       
}
//#endregion

//#region /*===  Post  ===*/
export function postLogin(body){
    let formData = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Account/Login`
    return fetch(url, formData)
        .then((response) => response.ok);
}

export function postRegister(body){
    let formData = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Account/Registration`
    return fetch(url, formData)
        .then((response) => response.ok);
}
//#endregion
//#endregion

//#region /*=== Update ===*/
export function updateUser(body){
    let formData = {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Account/Update`
    return fetch(url, formData)
        .then((response) => response.ok);
}

//#endregion

//#region Admin
/*=====================================================*/
/*                       Admin                         */
/*=====================================================*/

//#region /*===  GET  ===*/
export function getAllUser(){
    return fetch(`https://localhost:7021/api/Admin`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json());
}

export function getAllRole(){
    return fetch(`https://localhost:7021/api/Role`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json());
}
//#endregion

//#region /*===  Post  ===*/

export function deleteUser(body){
    let formData = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    let url = `https://localhost:7021/api/Admin/Delete`
    let result=null;
    try {
        result = fetch(url, formData)
        .then((response) => response.ok)
        .catch((err) => console.log(err))

    }catch(err){
        console.log(err);
    }
    return result;
}

//#endregion

//#endregion

//#region Other
/*=====================================================*/
/*                       Other                         */
/*=====================================================*/

//#region /*===  GET  ===*/

export function getSearched(searchPhrase){
    return fetch(`https://localhost:7021/api/Home/Search/${searchPhrase}`,{
        method: "GET",
        headers: {
            'Accept':  'application/json',
           'Content-Type': 'application/json',
           'Cache': 'no-cache'
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json());
}

//#endregion

//#region /*===  Post  ===*/

//#endregion
//#endregion




