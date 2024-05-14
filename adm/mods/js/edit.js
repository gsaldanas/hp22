app.editMod = function (id) {
    // maakt de form leeg
    app.form_new.reset();
    //laad data
    let F = new FormData();
    F.append('mid', id);
    fetch(app.url.one_mod, {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
    .then((response)=> response.json())
    .then((data)=>{
        app.populateForm(data);
    })
};
//populate form
app.populateForm=function(data){
    console.log(data);
    let form=app.form_new;
    form.mod_id.value=data.MA_ID;
    form.naam_mod.value=data.ma_naam;
    form.img_mod.value=bLib.decodeHtml(data.ma_img);
    form.path_mod.value=data.ma_path;
    form.desc_mod.value=data.ma_omsch;
    form.dev_mod.value=data.ma_public;
    bLib.showDiv(app.div_new);
}