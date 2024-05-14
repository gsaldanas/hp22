
const lang={
    nl:document.getElementById('ndlns'),
    fr:document.getElementById('frans'),
    dom:{
        nl: document.URL+'nl/login/',
        fr: document.URL+ 'fr/login/'
    }
}
/**
 *   Read local
 */
lang.readLSLang=function(){
    return localStorage.getItem('language');
};
/**
 * Set language item
 */
lang.setLSLang=function(lang){
    localStorage.setItem('language',lang);
    return true;
};
/**
 *   Actions
 */
lang.doeLanguage=function(){
    let taal=lang.readLSLang();
    if(taal !== null){
        window.location=document.URL+taal+'/login/';
        console.log(document.URL+taal+'/login/');
    }
}


lang.nl.addEventListener('click',()=>{ 
    lang.setLSLang('nl');
    window.location=lang.dom.nl;
});
lang.fr.addEventListener('click',()=>{ 
    lang.setLSLang('fr');
    window.location=lang.dom.fr;
});
lang.doeLanguage();