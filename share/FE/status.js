
const URL_STATUS='../../share/BE/secure/status_user.php';
let URL_START='/app/';
//read local storage for language redirection
let lang=localStorage.getItem('language');
if(lang == 'fr'){
    URL_START+='fr/home/';
}else{
    URL_START+='nl/home/';
}
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