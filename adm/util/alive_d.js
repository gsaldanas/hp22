const URL_STATUS='../../share/BE/secure/status_adm.php';
fetch(URL_STATUS,{
    method: "POST",
    credentials: "same-origin"
})
.then((response) => response.json())
    .then((result) => {
        if(result.STATUS !== 'ALIVE'){
            document.location = 'https://' + document.domain; 
        }else{
            history.pushState('hier', document.location)
            console.log('logged in, stay on page.')
        }
    });