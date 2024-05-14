app.btn_new.addEventListener('click', (e) => {
    e.preventDefault();
    app.clearPlayground();
    bLib.showDiv(app.div_new);
});
//cancel form
app.btn_cancel.addEventListener('click', (e) => {
    e.preventDefault();
    app.clearPlayground();
});
//Save wachtwoord event
app.btn_save_pwd.addEventListener('click',(e)=>{
    e.preventDefault();
    app.saveNewPwd();
});
// cancel reset pwd
app.btn_cancel_pwd.addEventListener('click', (e) => {
    e.preventDefault();
    app.clearPlayground();
});