const URL_T = '../action/S/getSecureToken.php';
const URL_P = '../action/S/restorePWD.php';
const URL_S = "https://happiness22.be/app/nl/login/index.html";
// codegrepper Javascript By Frail Flamingo on Jul 23 2020
const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mail = email.trim() //remove white spaces
    return re.test(String(mail).toLowerCase());
};
/*------------------------------
 *  UI AND MESSAGE
 -------------------------------- */
const ui_pw = {
    main_box: document.querySelector('.restore-container'),
    frm: document.getElementById('restorePWD'),
    btn_save: document.getElementById('go'),
    feedback: document.querySelector('.feedback'),
    form_box: document.querySelector('.form-box'),

    clear_fb: function () {
        this.feedback.innerHTML = '';
        this.feedback.classList.add("no-display");
    },
    show_fb: function () {
        this.feedback.classList.remove("no-display");
    },
    enable_save: function () {
        this.btn_save.classList.remove("disabled");
        this.btn_save.disabled = false;
    },
    disable_save: function () {
        this.btn_save.classList.add("disabled");
        this.btn_save.disabled = true;
    },
    email: '',
    token: '',
    cookie: ''
};
const message = {
    NO_MAIL: 'No account matches ',
    ZENDING: 'Password Reset Email Sent',
    EMAIL_FB_START:'Un e-mail a été envoyé à votre adresse e-mail de secours, ',
    EMAIL_FB_END: " . Suivez les instructions dans l'e-mail pour réinitialiser votre mot de passe..",
    NO_VALID_MAIL: 'Please enter a valid email address',
    MAX_PROBES: 'You have reached the limit for requesting password change. '
};

/*------------------------------
 *  GET CSRF TOKEN
 -------------------------------- */
window.addEventListener('load', function () {
    console.log('loading..complete');
    ui_pw.frm.email.value = '';
    let frm = new FormData();
    frm.append('csrf_req', 'csrf');
    if (ui_pw.token != '') {
        frm.append('TOKEN', ui_pw.token);
    }
    fetch(URL_T, {
        method: 'post',
        credentials: 'same-origin',
        body: frm
    })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                ui_pw.token = data.TOKEN;
                ui_pw.cookie = data.C;
            });
});
/*------------------------------
 *  Clear feedback on input
 -------------------------------- */
ui_pw.frm.email.addEventListener('input', function (event) {
    ui_pw.clear_fb();
    ui_pw.enable_save();
})
/*-------------------------------
 *   ZEND DE FORM
 --------------------------------- */
ui_pw.btn_save.addEventListener('click', function (event) {
    event.preventDefault();
    let email = ui_pw.frm.email.value;

    console.log('email---> ' + email);
    ui_pw.clear_fb();

    if (validateEmail(email)) {
        ui_pw.email = email;
        console.log('sendig form...' + email);
        //send form
        let F = new FormData(ui_pw.frm);
        F.append('TOKEN', ui_pw.token);
        F.append('COOKIE', ui_pw.cookie);

        fetch(URL_P, {
            method: 'post',
            credentials: 'same-origin',
            body: F
        })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.MAIL_STATUS == 'OK') {
                        ui_pw.main_box.querySelector('p').innerHTML =message.EMAIL_FB_START + email +  message.EMAIL_FB_END;
                        ui_pw.main_box.querySelector('h1').innerHTML=message.ZENDING;
                        document.querySelector('.link-login > a').innerHTML='DONE';
                        document.querySelector('.image-pwd').src="https://happiness22.be/app/assets/img/done.png";
                        // disable the form
                        ui_pw.form_box.style.display='none';
                    }
                    if (data.MAX_PROBES) {
                        console.log(message.MAX_PROBES);
                        ui_pw.form_box.innerHTML = '';
                        ui_pw.main_box.querySelector('p').innerHTML = '';
                        ui_pw.main_box.querySelector('h1').innerHTML = message.MAX_PROBES;
                        setTimeout(function () {
                            window.location = URL_S;
                        }, 3000);
                    }
                    if (data.MAIL_STATUS == 'NOK') {
                        ui_pw.feedback.innerHTML = message.NO_MAIL + email;
                        ui_pw.show_fb();
                    }

                });

    } else {
        ui_pw.feedback.innerHTML = message.NO_VALID_MAIL;
        ui_pw.disable_save();
        ui_pw.show_fb();
    }

});