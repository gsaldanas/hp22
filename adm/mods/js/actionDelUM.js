app.div_users.addEventListener('click', function (e) {
    e.preventDefault();
    let target = e.target;
    if (target.tagName != 'SPAN') return;

    let umid = e.target.dataset.umid;
    let uid = e.target.dataset.uid;
    
    let F = new FormData();
    F.append('umid', umid);
    F.append('uid', uid);
    fetch(app.url.remove_mod, {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
    .then((response)=> response.json())
    .then((data)=>{
        app.handleRemoveModUser(data);
    })

});
app.handleRemoveModUser=function(data){
    console.log(data);
}
