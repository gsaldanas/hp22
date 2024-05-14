app.toonUserMods=function(uid){
    app.clearPlayground();
    let F=new FormData();
    F.append('uid',uid);
    fetch(app.url.get_one,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then((response)=> response.json())
    .then(data=>{
        app.displayUserCard(data);
    })
};

//user card
app.displayUserCard=function(data){
    console.log(data);
    app.checkStatus(data.STATUS,data.ACCESS);
    let card=app.userCard(data);
    app.div_content.appendChild(card);
}