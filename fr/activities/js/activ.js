app.showOneActivity=function(id){
    let F=new FormData();
     F.append('id',id);
     fetch(app.url.getOne,{
        method:'post',
        credentials:'same-origin',
        body:F
     })
     .then(resp=> resp.json())
     .then(data=>{
        console.log(data);
        app.displayOverlayData(data);
     });
     app.showOverlay();

}

app.showOverlay=function(){
    app.one_act.style.display='block';
}
app.displayOverlayData=function(data){
    app.over.titel.innerHTML=data.TITEL;
    app.over.img.src=app.url.img_path+data.IMAGE;
    app.over.desc.innerHTML=data.DESCRIPTION;
    app.over.ul.innerHTML=data.GEZOND_V
    app.over.gezond.innerHTML='Quelques avantages pour la santé scientifiquement prouvés de ' + data.TITEL+ ' sont: '
    app.over.waar.innerHTML=data.WAAR;
    app.over.wanneer.innerHTML=data.WANNEER;
    
    app.over.links.innerHTML='';
    let links=data.LINK_URL.split(';');
    let legend=["cliquez ici pour plus d'informations", 'informations supplémentaires', 'plus..',' ..ou ici'];
     console.log(links);
     for(i=0;i<links.length ;i++){
        let a=bLib.newElement('a',[
            {
                name:'href',
                value: links[i].trim()
            },
            {
                name:'class',
                value:'extern-link'
            },
            {
                name:'target',
                value:'_blank'
            }
        ]);
        a.innerHTML=legend[i]+' <br/>';
        app.over.links.appendChild(a);
     }
     
     app.over.kost.innerHTML=data.KOSTPRIJS;
     app.over.benod.innerHTML=data.BENODIGHEDEN;

     app.over.contac.innerHTML=data.CONTACT+ ': '+data.CONTACT_INFO;
     
     } 