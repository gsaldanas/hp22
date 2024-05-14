app.loadMods=function(){
    fetch(app.url.loadM,{
        method:'post',
        credentials:'same-origin'
    })
    .then((response)=> response.json())
    .then((data)=>{
        app.handleModules(data);
    })
};

//---modules--
app.handleModules=function(data){
    console.log(data);
    data.forEach(element => {
        let mod=app.createModule(element);
        app.modules.appendChild(mod);
    });
}
//create Module new
app.createModule=function(m){
    let card=bLib.newElement('div',[
        {
            name:'class',
            value:'card-container'
        },
        {
            name:'data-path',
            value:m.ma_path
        }
    ]);
    card.innerHTML=bLib.decodeHtml(m.ma_img);
    let h3=bLib.newElement('h3',[
        {
            name:'class',
            value:'card-title'
        },
        {
            name:'data-path',
            value:m.ma_path
        }
    ]);
    h3.innerHTML=m.ma_naam;
    card.appendChild(h3);

    return card;
};