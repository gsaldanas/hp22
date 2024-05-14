const app={
    url: {
        set_done:'action/C/setQuestDone.php',
        log_no_action:'action/C/logNoAction.php'
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
    app.logGeenActiviteit();
   
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
//  LOG MENSEN DIE GEEN ACTIVITEIT DOEN
app.logGeenActiviteit=function(){
fetch(app.url.log_no_action,{
    method:'post',
    credentials:'same-origin'
})
.then(resp => resp.json)
.then(data=>{
    console.log(data);
    window.location='index.html'
});
}