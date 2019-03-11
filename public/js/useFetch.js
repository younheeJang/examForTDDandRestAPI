function updateCourse() {
    let course_name = document.getElementById('course1').value;
    let course_price = document.getElementById('price1').value;
    return fetch('/courses', {
            method: 'put',
            body: JSON.stringify({
                'course_name': course_name,
                'course_price': Number(course_price)
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then((WriteResult) => alert('열럽뿐 수정되써여!!! 이백.' + WriteResult.status))
}

function deleteCourse() {
    let course_name = document.getElementById('course2').value;
    return fetch('/courses', {
            method: 'delete',
            body: JSON.stringify({
                'course_name': course_name
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then((WriteResult) => alert('열럽뿐 지워져써여!!! 이백.' + WriteResult.status))
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}