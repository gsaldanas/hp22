//CANCEL FORM
app.btn_cancel.addEventListener('click',(e)=>{
    e.preventDefault();
    app.clearPlayground();
})

// SUBMIT FORM NEW MODULE
app.btn_save.addEventListener('click',(e)=>{
    e.preventDefault();
      let mid=app.form_new.mod_id.value;
      console.log('mid:' + mid);
    let F=new FormData(app.form_new);
if(mid == 0){
    fetch(app.url.save,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(response =>response.json())
    .then(data=>{
        app.handleNewMod(data);
    })//end fetch.
}else{

    fetch(app.url.update,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(response =>response.json())
    .then(data=>{
        app.handleUpdate(data);
    })//end fetch.
}

})
// new module handler
app.handleNewMod=function(data){
    //alert(data.INFO);
    console.log(data);
    app.clearPlayground();
    app.loadModules();
}
//update handler
app.handleUpdate=function(data){
    console.log(data);
    app.clearPlayground();
    app.loadModules();
}