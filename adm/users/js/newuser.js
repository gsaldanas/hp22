//check passwoord
app.checkPassword = function () {
    let pw1 = app.form_new.pwd1.value;
    let pw2 = app.form_new.pwd2.value;
    if ((pw1.trim() == '') || (pw2.trim() == '')) {
        return false;
    }
    return ((pw1.trim()) == (pw2.trim)());
}
//check of user exist
app.form_new.email.addEventListener('change', (e) => {
    e.preventDefault();
    let email = app.form_new.email.value;
    console.log(email);
    let F = new FormData();
    F.append('email', email);
    fetch(app.url.check_uname, {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
        .then(response => response.json())
        .then(data => {
            //check status app
            app.checkStatus(data.STATUS,data.ACCESS);
            if (data.RESP != 'OK') {
                app.div_feedback.innerHTML = app.info.user_exist;
                bLib.showDiv(app.div_feedback);
            }else{
                app.div_feedback.innerHTML='';
            }
        })
});
//---BTN SAVE SUBMIT
app.btn_save.addEventListener('click', (e) => {
    e.preventDefault();
    bLib.clearEl(app.div_feedback);
    if (!app.checkPassword()) {
        app.div_feedback.innerHTML = app.info.badForm;
        bLib.showDiv(app.div_feedback);
        return false;
    }
    let uid = app.form_new.uid.value;
    let F = new FormData(app.form_new);
    if (uid == 0) {
        //save
        fetch(app.url.save, {
            method: 'post',
            credentials: 'same-origin',
            body: F
        })
            .then(response => response.json())
            .then(data => {
                app.handleNewUser(data);
            })//end fetch.
    } else {
        //update
        fetch(app.url.update, {
            method: 'post',
            credentials: 'same-origin',
            body: F
        })
            .then(response => response.json())
            .then(data => {
                app.handleUpdate(data);
            })//end fetch.

    }
});
//handle save
app.handleNewUser = function (data) {
    console.log(data);
    //check status app
    app.checkStatus(data.STATUS,data.ACCESS);
}
//handle update
app.handleUpdate = function (data) {
    console.log(data);
    //check status app
    app.checkStatus(data.STATUS,data.ACCESS);
}