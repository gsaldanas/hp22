const app={
    url: {
        set_done:'action/C/setQuestDone.php'
    }
}
document.getElementById('btn_discover')
.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location='../activities/';
});
document.getElementById('btn_stay')
.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location='index.html'
});

window.onload=(event)=>{
    fetch(app.url.set_done,{
        method:'post',
        credentials:'same-origin'
    })
    .then(resp=> resp.json())
    .then(data =>{
        console.log(data);
    })
}