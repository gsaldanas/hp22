const app = {//profiel
    logout_btn:document.getElementById('link_logout'),
    info_container:document.querySelector('.info-text'),
    info:document.querySelector('.extra-info-p'),
    actions:document.querySelector('.acties'),
    naam:document.getElementById('beste_user'),
    profile:document.getElementById('user_profiel'),

    url: {
        logout: '../../../app/share/BE/logout.php',
        img_path:'https://happiness22.be/app/assets/svg/ac/',
        getUser:'action/R/getUser.php',
        save_info:'action/C/saveUser.php'
    }
};
window.onload=(event)=>{
   app.loadUserInfo();
}
/**
 *  load user info
 */
app.loadUserInfo=()=>{
    fetch(app.url.getUser,{
        method:'post',
        credentials:'same-origin'
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        app.populateForm(data);
    })
}
/**
 * populate form
 */
app.populateForm=(data)=>{
let info=data[0];
    app.profile.uid.value=info.ID;
    app.profile.email.value=info.user_email;
    app.profile.naam.value=info.display_name;
}
/**
 * submit
 */
app.profile.addEventListener('submit',(e)=>{
    e.preventDefault();
    let F=new FormData(app.profile);
    fetch(app.url.save_info,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        alert(data.INFO);
        app.loadUserInfo();
    })
})