app.deleteUser = function (uid) {
    if (!confirm('Ben je zeker dat deze user verwijderd moet worden?')) return;
    console.log('Delete user:' + uid);
    let F = new FormData();
    F.append('uid', uid);
    fetch(app.url.delete, {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
        .then((response) => response.json())
        .then(data => {
            app.handleDelete(data);
        })
};
// delete handler
app.handleDelete = function (data) {
    console.log(data);
    //check status app
    app.checkStatus(data.STATUS);
    bLib.showDiv(app.div_feedback);
    app.div_feedback.innerHTML = data.INFO;
    app.btn_list.click();
}