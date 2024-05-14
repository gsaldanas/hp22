const URL_STATUS='../../share/BE/secure/status_user.php';
fetch(URL_STATUS,{
    method: "POST",
    credentials: "same-origin"
})
.then((response) => response.json())
    .then((result) => {
        if(result.STATUS !== 'ALIVE'){
            document.location = 'https://' + document.domain+'/app/'; 
        }else{
            history.pushState('hier', document.location)
            console.log('logged in, stay on page.')
            createJSLinkAndLaunch();
        }
    });
/**
 *   Create link
 *  */    

const createJSLinkAndLaunch=function(){
    let scrpt=document.createElement('script');
     scrpt.setAttribute('src','//embed.typeform.com/next/embed.js');
    document.body.appendChild(scrpt);
}