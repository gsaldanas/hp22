const app={
    a_list:document.getElementById('activ_list'),
    one_act:document.getElementById('overlay_act'),
    btn_choose:document.getElementById('choose_act'),
    url:{
        acties:'action/R/loadActions.php',
        img_path:'https://happiness22.be/app/assets/svg/ac/',
        save:'action/C/saveActivity.php',
        getOne:'action/R/getOneAct.php',
        setChoice:'action/C/setChoice.php'
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
/**
 * link geen interesse
 */
document.querySelector('.geen')
.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location='../home/';
})

app.loadActivities=function(){
    let F=new FormData();
    F.append('taal','NL');
    fetch(app.url.acties,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);
        app.displayCards(data);
    })
}
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
app.displayCards=function(data){
    data.forEach(el=>{
        let card=app.activityCard(el);
        app.a_list.appendChild(card);
    })
}
/**
 * event listeners
 */
app.a_list.addEventListener('click',(e)=>{
    e.preventDefault();
    let target=e.target;
    console.log(target);
    if(target.tagName == 'IMG' || target.tagName == 'P'){
        let act_id=target.parentElement.dataset.cid;
     /**
      *  add activity id to choose button
      *  */   
     document.getElementById('choose_act').setAttribute('data-cid',act_id);
       app.showOneActivity(act_id);  
    }

})
/**
 *   event listener button activity
 */
app.btn_choose.addEventListener('click',(e)=>{
    e.preventDefault();
    let F=new FormData();
    let id=app.btn_choose.dataset.cid;
    F.append('act_id',id);
    fetch(app.url.setChoice,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        if(data.STATUS == 200){
            window.location='choosed.html';
        }else{
            alert('Server error, go back and try again please.');
        }
    })
})
/**
 *  Close overlay activities
 */
document.querySelector('.link-terug')
.addEventListener('click',(e)=>{
    app.one_act.style.display='none';
})

app.loadActivities();