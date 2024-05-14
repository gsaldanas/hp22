// init admin
const app = {
    form: document.getElementById('loginForm'),
    btn_submit: document.getElementById('submit'),
    url:
    {
        logme: 'action/logme.php',
        start: '../dashboard/',
        domain: 'https://'+document.domain
    },
    feedback:document.querySelector('.tagline') ,
    info: {
        deny:'Acess deny',
        max_probes:'maximun probes reached',
    }
}