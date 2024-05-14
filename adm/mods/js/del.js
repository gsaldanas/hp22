app.deleteMod=function(id){
    if(!window.confirm('bent u zeker?')){
        return;
    }
let F= new FormData();
F.append('mid',id);
fetch(app.url.delete,{
    method:'post',
    credentials:'same-origin',
    body:F
})
.then((response)=> response.json())
.then(data=>{
    app.handleRespDelete(data);
})
};
//handler
app.handleRespDelete=function(data){
    console.log(data);
    bLib.clearEl(app.div_content);
    bLib.clearEl(app.div_users);
    app.loadModules();
}