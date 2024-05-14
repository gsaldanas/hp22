//mijnActies
const app = {
    logout_btn:document.getElementById('link_logout'),
    overzicht:document.querySelector('.overzicht'),
    info_container:document.querySelector('.info-text'),
    info:document.querySelector('.extra-info-p'),
    actions:document.querySelector('.acties'),
    naam:document.getElementById('beste_user'),
    btn_inv:document.getElementById('btn_inv'),
    form:document.getElementById('activity_reg'),
    url: {
        logout: '../../../app/share/BE/logout.php',
        activity:'action/R/getCurrentAct.php',
        load_regs:'action/R/getRegistraties.php',
        img_path:'https://happiness22.be/app/assets/svg/ac/',
        save_form:'action/C/saveActivity.php',
        get_data:'action/R/getOverzicht.php',
        delete:'action/D/deleteEntry.php',
    },
    month:['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'],
    mois:['janvier',
'février',
'mars',
'avril',
'mai',
'juin',
'juillet',
'août',
'septembre',
'octobre',
'novembre',
'décembre']
};
window.onload=(event)=>{
    event.preventDefault();
    app.loadCurrentAct();
    if(app.form == null){
        app.getOverzicht();
    }
   
}
/**
 * Load current activvity
 */
app.loadCurrentAct=function(){
    fetch(app.url.activity, {
        method: 'post',
        credentials: 'same-origin'
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if(data.length == 0){
          window.location='../home/';

            }

            if(app.form != null){
            app.populateForm(data);
               app.showMessageAct(data);
            }
            else{
                app.displayActivity(data);
            }

         
      
        })
}
/**
 * populate form
 */
app.populateForm=(data)=>{
    app.form.act_id.value=data.AC_ID;
    app.form.name_act.value=data.TITEL;
}
/**
 * show info activities
 */
app.showMessageAct=(data)=>{
    let today= new Date(data.TODAY * 1000);
    let wago=new Date (data.WAGO * 1000);
    
     
    let startdag=wago.getDate();
    let begin_maand=app.month[wago.getMonth()];
    let end_maand=app.month[today.getMonth()];
    let enddag=today.getDate()
    
    let sweek=document.getElementById('week_nr');
    let act=document.getElementById('activity');

    let lapsus=startdag + ' '+begin_maand+ ' - '+enddag+' ' + end_maand;
    app.form.timelapse.value=lapsus;

    sweek.innerHTML=' '+startdag+ ' '+ begin_maand + ' tot ' + enddag + ' '+ end_maand + ' je activiteit ';
    act.innerHTML=data.TITEL + ' ';

}