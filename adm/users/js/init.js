const app={
    div_content:document.querySelector('.content'),
    div_new:document.querySelector('.new-user'),
    div_feedback:document.querySelector('.feedback'),
    div_modules:document.getElementById('modules_user'),
    form_new:document.getElementById('new_user'),
    btn_save:document.getElementById('save_user'),
    btn_cancel:document.querySelector('.cancel'),
    btn_new:document.getElementById('add_user'),
    btn_list:document.getElementById('list_users'),
    input_zoek:document.getElementById('zoek_user'),
    //paswoord
    div_pwd:document.getElementById('reset'),
    form_pwd:document.getElementById('resetPwForm'),
    btn_save_pwd:document.getElementById('save_pw'),
    btn_cancel_pwd:document.querySelector('.cancel-pw'),
    username:document.querySelector('.user-naam'),
    
    url:{
        save:'action/C/newUser.php',
        update:'action/U/updateUser.php',
        delete:'action/D/deleteUser.php',
        get_users:'action/R/getUsers.php',
        zoek:'action/R/zoekUser.php',
        check_uname:'action/R/checkUname.php',
        reset_pw:'action/U/resetPw.php',
        get_one:'action/R/getOneUser.php',
        available_mods:'action/R/getModsAvail.php'
    },
    info:{
        user_exist:'Deze email is reeds geregistreerd',
        badForm:'Gelieve de form correct in te vullen',
        passDif:'Wachtwoorden komen niet overeen'
    }
}
//clear playground
app.clearPlayground=function(){
    bLib.clearManyEls([
        app.div_content,
        app.div_feedback,
        app.username,
        app.div_modules
    ]);
    //hide de form en clear data
    bLib.hideDiv(app.div_new);
    bLib.hideDiv(app.div_pwd);

    app.form_pwd.reset();
    app.form_pwd.uid.value=0;    

    app.form_new.reset();
    app.form_new.uid.value=0;
}
//status app
app.checkStatus=function(status,access){
    console.log(status + ' '+ access);
    if((access === 'DENY') || (status == 'TIMEOUT')){
        document.location='https://'+document.domain+'/app/adm/logme';
    }
}