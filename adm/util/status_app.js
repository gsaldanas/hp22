const URL_STATUS='../util/alive.php';
const PATH=document.location.pathname;
const URL_LOGME='/app/adm/logme';
let F=new FormData;
F.append('pathname',PATH);
fetch(URL_STATUS,{
    method: "POST",
    credentials: "same-origin",
    body:F
})
.then((response) => response.json())
    .then((result) => {
        if(result.STATUS !== 'ALIVE'){
            document.location = 'https://' + document.domain+ URL_LOGME; 
        }else{
            history.pushState('hier', document.location)
            console.log('logged in, stay on page.')
        }
    });