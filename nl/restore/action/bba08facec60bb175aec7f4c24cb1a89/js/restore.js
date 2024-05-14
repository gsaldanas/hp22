const ui = {
    form: document.getElementById('restorePWD'),
    feedback: document.querySelector('.feedback'),
    zie_pwd: document.querySelector('.zie-pwd'),
    btn_save: document.querySelector('.btn-pwd'),
    input_fields: document.querySelectorAll('.fields > input'),
 

    enable_save: function () {
        this.btn_save.classList.remove("disabled");
        this.btn_save.disabled = false;
    },
    disable_save: function () {
        this.btn_save.classList.add("disabled");
        this.btn_save.disabled = true;
    }

};
//1 lowercase   1 Uppercase  1 numeric
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
const message = {
    pw_length: 'Your password must be at least 8 characters.',
    no_match: 'The new password and confirmation password do not match!!',
    strong: 'The string must contain at least the following: 1 lowercase letters,1 uppercase letter and 1 number.'
};

ui.input_fields[0].addEventListener('input', function (event) {
    ui.feedback.classList.add("no-display");
    ui.feedback.innerHTML = '';
    if (ui.input_fields[1].value != '') {
        ui.enable_save();
    }
});

ui.input_fields[1].addEventListener('input', function (event) {
    ui.feedback.classList.add("no-display");
    ui.feedback.innerHTML = '';
    if (ui.input_fields[0].value != '') {
        ui.enable_save();
    }
});

ui.zie_pwd.addEventListener('click', function () {

    if (ui.input_fields[0].type == 'text') {
        ui.input_fields[0].type = 'password';
        ui.input_fields[1].type = 'password';
        this.innerHTML = 'View password';
    } else {
        ui.input_fields[0].type = 'text';
        ui.input_fields[1].type = 'text';
        this.innerHTML = 'Hide password';
    }

});

ui.form.addEventListener('submit', function (event) {
    event.preventDefault();
    let error = false;
    //---lengte min 8
    if (this.pwd.value.length < 8) {
        ui.feedback.classList.remove("no-display");
        ui.disable_save();
        ui.feedback.innerHTML = message.pw_length;
        error = true;
    }
    //---match------
    if (this.pwd.value.trim() !== this.pwd1.value.trim()) {
        ui.feedback.classList.remove("no-display");
        ui.disable_save();
        ui.feedback.innerHTML += message.no_match;
        error = true;
    }
    //----conditions----
    if (!error) {
        if (strongRegex.test(this.pwd.value.trim())) {
            console.log('strong enough!!');
            zendDeForm();

            //-----feedback--conditions      
        } else {
            ui.feedback.classList.remove("no-display");
            ui.disable_save();
            ui.feedback.innerHTML += message.strong;
            error = true;
        }
    }

});

const zendDeForm = function () {
    console.log('sending the form !!');
    let F = new FormData(ui.form);
    F.append('TOKEN', token);

    fetch('S/changePWD.php', {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.STATUS == 'OK' && data.PW == 'YES') {
                    //feedback pwd
                    let h = document.querySelector('.restore-container > h1');
                    let h3 = document.querySelector('.restore-container > h3');
                    let p = document.querySelector('.restore-container > p');
                    let link_box = document.querySelector('.link-login');
                    let link = link_box.querySelector('a');
                    link_box.classList.remove("no-display");

                    h.innerHTML = 'Password Updated';
                    h3.innerHTML = '';
                    p.innerHTML = "Your password has been changed successfully. Use your password to log in";

                    document.querySelector('.form-box').innerHTML = '';
                    link.innerHTML = 'DONE.';
                     document.querySelector('.image-pwd').src="https://happiness22.be/app/assets/img/done.png";

                } else {
                    console.log(data);
                    if(data.EXPIRED ){
                        app.feedback.innerHTML='Session expired. ';
                        let link='https://'+document.domain+'/app/nl/login';
                        document.querySelector('form-box').innerHTML='<a href="'+link+'" >TERUG</a>';
                    }
                    alert('FAILURE');
                    document.location.reload();
                }
            });
};