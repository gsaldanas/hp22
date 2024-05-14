const app={
    card:document.querySelector('.card-choice'),
    one_act:document.getElementById('overlay_act'),
    btn_choose:document.getElementById('choose_act'),
    extra_info:document.querySelector('.extra-info'),
    url:{
        img_path:'https://happiness22.be/app/assets/svg/ac/',
        getAct:'action/R/getCurrentAct.php',
    }
  
}
  app.over={
        titel:app.one_act.querySelector('.titel'),
        img:app.one_act.querySelector('img'),
        desc:app.one_act.querySelector('.desc'),
        gezond:app.one_act.querySelector('.gezond'),
        ul:app.one_act.querySelector('ul.voordelen'),
        waar:app.one_act.querySelector('.waar'),
        wanneer:app.one_act.querySelector('.when'),
        links:app.one_act.querySelector('div.links-act'),
        kost:app.one_act.querySelector('.kost'),
        benod:app.one_act.querySelector('.access'),
        contac:app.one_act.querySelector('.contactp')
    }
    window.addEventListener('load',(e)=>{
       console.log(document.referrer);
       if(document.referrer == ''){
        console.log('not allowed');
        window.location='https://happiness22.be/app/';
       }
       fetch(app.url.getAct,{
            method:'post',
            credentials:'same-origin'
       })
       .then(resp=>resp.json())
       .then(data=>{
        console.log(data);
        app.displayActivityCard(data);
        //app.populateInfo(data);
        app.displayOverlayData(data);
       })
    })
/**
 * Activity card
 */
 app.activityCard=function(act){
    let div=bLib.newElement('div',[
        {
            name:'class',
            value:'activity-card'
        },
        {
            name:'data-cid',
            value:act.AC_ID
        }
    ]);
    let img=bLib.newElement('img',[
        {
            name:'src',
            value:app.url.img_path+act.IMAGE
        },
        {
            name:'alt',
            value:act.TITEL
        }
    ]);
    let p=bLib.newElement('p',[
        {
            name:'class',
            value:'titel'
        }
    ]);
    p.innerHTML=act.TITEL;

    div.appendChild(img);
    div.appendChild(p);

    return div;
}
/**
 * display activity card
 */
app.displayActivityCard=function(data){
    let card=app.activityCard(data);
    app.card.appendChild(card);
}
/**
 * even listener extra info
 */
app.extra_info.addEventListener('click',(e)=>{
    e.preventDefault();
    app.one_act.style.display='block';
})

/**
 *  Close overlay activities
 */
 document.querySelector('.link-terug')
 .addEventListener('click',(e)=>{
     app.one_act.style.display='none';
 })
 app.displayOverlayData=function(data){
    app.over.titel.innerHTML=data.TITEL;
    app.over.img.src=app.url.img_path+data.IMAGE;
    app.over.desc.innerHTML=data.DESCRIPTION;
    app.over.ul.innerHTML=data.GEZOND_V
    app.over.gezond.innerHTML='Enkele wetenschappelijk bewezen gezondheidsvoordelen van ' + data.TITEL+ ' zijn: '
    app.over.waar.innerHTML=data.WAAR;
    app.over.wanneer.innerHTML=data.WANNEER;
    
    app.over.links.innerHTML='';
    let links=data.LINK_URL.split(';');
    let legend=['Klik hier voor info', 'Extra info', 'Meer..',' ..of hier'];
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
            }
        ]);
        a.innerHTML=legend[i]+' <br/>';
        app.over.links.appendChild(a);
     }
     
     app.over.kost.innerHTML=data.KOSTPRIJS;
     app.over.benod.innerHTML=data.BENODIGHEDEN;

     app.over.contac.innerHTML=data.CONTACT+ ': '+data.CONTACT_INFO;
     
     } 
     /**
      *  button go to profiel
      */
     document.getElementById('btn_go_profiel').addEventListener('click',(e)=>{
        window.location="https://happiness22.be/app/nl/home/";
     })