//check passwoord
app.checkPasswordReset = function () {
    let pw1 = app.form_pwd.pwd1.value;
    let pw2 = app.form_pwd.pwd2.value;
    if ((pw1.trim() == '') || (pw2.trim() == '')) {
        return false;
    }
    return ((pw1.trim()) == (pw2.trim)());
}
app.resetPwd=function(uid,uname){
    console.log('reset pwd user:' + uid);
    app.clearPlayground();
    bLib.showDiv(this.div_pwd);
    //put uid in form
    app.form_pwd.uid.value=uid;
    app.username.innerHTML=uname;
  
};
//save New pwd
app.saveNewPwd=function(){
  if (!app.checkPasswordReset()) {
        app.div_feedback.innerHTML = app.info.badForm;
        bLib.showDiv(app.div_feedback);
        return false;
    }
    let F= new FormData(app.form_pwd);
    fetch(app.url.reset_pw,{
        method:'post',
        credentials: 'same-origin',
        body:F
    })
    .then((response)=> response.json())
    .then(data=>{
        app.handleReset(data);
    })
}

// handle reset

app.handleReset=function(data){
    console.log(data);
    app.checkStatus(data.STATUS,data.ACCESS);
    alert(data.INFO);
}