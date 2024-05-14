app.form.addEventListener('submit', (e) => {
    e.preventDefault();
    let F = new FormData(app.form);
    fetch(app.url.logme, {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
        .then(response => response.json())
        .then(data => {
            app.handleResponse(data);
        })
});
//  HANDLER RESPONSE
app.handleResponse = function (data) {
    console.log(data);
     switch(data['STATUS']){
                case 401:console.log('us not authorized');
                    app.feedback.innerHTML=app.info.deny;
                    app.feedback.style.display='block';
                    break;
                case 406:console.log('abt session');
                    app.feedback.innerHTML=app.info.max_probes;
                    app.feedback.style.display='block';
                    window.location=app.url.domain;
                    break;
                case 202:console.log('us accepted');
                    document.location=app.url.start;
                    break;
                default: break;
            }
};
