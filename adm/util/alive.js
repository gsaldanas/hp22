//ALIVE.JS  Is user logged in
const URL_STATUS='../util/aliveLogin.php';
const URL_START='/app/adm/dashboard/';

fetch(URL_STATUS,{
    method: "POST",
    credentials: "same-origin"
})
.then((response) => response.json())
    .then((result) => {
        if(result.STATUS === 'ALIVE'){
            document.location = 'https://' + document.domain + URL_START;
        }else{
            history.pushState('hier', document.location)
            console.log('not logged in, fill the form.')
        }
    });