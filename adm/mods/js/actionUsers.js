app.div_users.addEventListener('click', function (e) {
    e.preventDefault();
    let target = e.target;
    if (target.tagName != 'A') return;

    let uid = e.target.dataset.uid;
    let mid = e.target.dataset.mid;
    console.log('mods: '+uid+' '+mid);
    let F = new FormData();
    F.append('uid', uid);
    F.append('mid', mid);
    fetch(app.url.user_mod, {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
    .then((response)=> response.json())
    .then((data)=>{
        app.handleUserToMod(data);
    })

});
app.handleUserToMod=function(data){
    console.log(data);
}
