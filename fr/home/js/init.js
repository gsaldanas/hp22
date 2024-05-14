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
        set_done:'action/C/setQuestDone.php'
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
        app.naam.innerHTML='Bonjour '+data.NAME; 
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
    app.naam.innerHTML='Bonjour '+data.NAME;
    //link vragenlijst
    let btn_quest=document.createElement('button');
    btn_quest.setAttribute('class','btn-green');
    btn_quest.innerHTML='Commencer le questionnaire';

    btn_quest.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location='https://'+document.domain+'/'+data.V_LINK;
    });

    app.info_container.appendChild(btn_quest);

}
