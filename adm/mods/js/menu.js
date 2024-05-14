
app.btn_new_mod.addEventListener('click',(e)=>{
    e.preventDefault();
    app.clearPlayground();
    bLib.showDiv(app.div_new);
});

app.btn_toon_mods.addEventListener('click',(e)=>{
    e.preventDefault();
    app.clearPlayground();
    app.loadModules();
});