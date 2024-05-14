const app = {
    form: document.getElementById('loginForm'),
    btn_submit: document.getElementById('submit'),

    url:
    {
        logme: 'action/logme.php',
        start: '../home/',
        domain: 'https://' + document.domain
    },
    feedback: document.querySelector('.tagline'),
    info: {
        deny: 'Acess denied',
        max_probes: 'maximun probes reached',
    }
}
/**
 * language
 */
document.getElementById('lang_btn').addEventListener('click',()=>{
    localStorage.setItem('language','nl');
    window.location='https://'+document.domain+'/app/';
})