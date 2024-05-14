app.logout.addEventListener('click',function(e){
    e.preventDefault();
    console.log('button logout clicked');
    fetch(app.url.logout,{
        method:"post",
        credentials:'same-origin'
    })
    .then((resp) => resp.json())
    .then((ans) => {
        if(ans.STATUS === 'TIMEOUT'){
            document.location='https://'+document.domain+'/app/adm/logme/'
        }else{
            alert('Somethings went wrong, please try again.')
        }
    })
})