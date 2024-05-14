const app = {//home
    logout_btn:document.getElementById('link_logout'),
    info_container:document.querySelector('.info-text'),
    info:document.querySelector('.extra-info-p'),
    actions:document.querySelector('.acties'),
    naam:document.getElementById('beste_user'),

    url: {
        logout: '../../../app/share/BE/logout.php',
        activity:'action/R/getCurrentAct.php',
        img_path:'https://happiness22.be/app/assets/svg/ac/',
        set_done:'action/C/setQuestDone.php',
        set_V_list:'action/C/setVragenLijst.php'
    }
};
/**
 *  get info and link
 */
 window.onload = (event) => {
    console.log('page is fully loaded');
    fetch('action/R/getInfo.php',{
        method:'post',
        credentials:'same-origin'
    })
    .then(response => response.json())
    .then(data=>{
        console.log(data);
   //display de naam
   app.naam.innerHTML='Beste '+data.NAME; 
        /**
         * als baseline reeds ingevuld geen link naar vragenlijst
         */
        if(data.STATUS_V == 0){
        app.displayInfo(data);
        }
        else{
            app.displayActivity();
        }
    })
  };
  /**
   *  display info
   */
app.displayInfo=function(data){
    app.info.innerHTML='';
    app.info.innerHTML=data.V_DESC;
    app.naam.innerHTML='';
    app.naam.innerHTML='Beste '+data.NAME;
    //link vragenlijst
    let btn_quest=document.createElement('button');
    btn_quest.setAttribute('class','btn-green');
    btn_quest.innerHTML='Start vragenlijst';

    btn_quest.addEventListener('click',(e)=>{
        e.preventDefault();
        // set hier test started
        app.setVragenlijst(data);
      //  window.location='https://'+ data.DOMAIN +'/'+data.V_LINK;
    });

    app.info_container.appendChild(btn_quest);

}
app.setVragenlijst=function(data){
    let v_id=data.V_ID;
    let url_redirect='https://'+ data.DOMAIN +'/'+data.V_LINK;

    if(data.V_LIST.V_ID == v_id){  // vragenlijst reeds gestart
        alert(' restart of werkt vragenlijst af');
        window.location=url_redirect;
        return;
    }
    let F=new FormData();
    F.append('v_id',v_id);
    F.append('v_name',data.V_NAME);
    fetch(app.url.set_V_list,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(resp => resp.json())
    .then(data=>{
        console.log(data);
        alert(' start vragenlijst');
        window.location=url_redirect;
    });
       
}
