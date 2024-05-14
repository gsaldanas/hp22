const app = {
    div_content: document.querySelector('.content'),
    div_users:document.getElementById('users_list'),
    div_new: document.getElementById('form_new'),
    form_new: document.getElementById('form_new_mod'),
    btn_save: document.getElementById('btn_save'),
    btn_cancel: document.getElementById('btn_cancel'),

    btn_lijst: document.getElementById('lijst_mods'),
    btn_new_mod: document.getElementById('new_mod'),
    btn_toon_mods:document.getElementById('mods'),
    url: {
        save: 'action/C/newMod.php',
        load: 'action/R/loadMods.php',
        users: 'action/R/getUsers.php',
        delete:'action/D/delMod.php',
        update: 'action/U/updateMod.php',
        user_mod:'action/C/userToMod.php',
        remove_mod:'action/D/removeModUser.php',
        one_mod:'action/R/getOneMod.php',
        update:'action/U/updateMod.php'
    }
}
//clear playground
app.clearPlayground=function(){
    bLib.clearManyEls([
        app.div_content,
        app.div_users
    ]);
    //hide de form en clear data
    bLib.hideDiv(app.div_new);
    app.form_new.reset();
    app.form_new.mod_id.value=0;
}