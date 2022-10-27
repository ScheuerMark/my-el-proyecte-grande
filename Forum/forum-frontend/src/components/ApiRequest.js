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
        .then((response) => response.ok)
}

export function getTopicTitles(){
    return fetch('/api/Home/Topics/Titles')
    .then((response) => response.json())
}