app.form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(('sendig form...'));
    let F=new FormData(app.form);
    fetch(app.url.save_form,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        alert(data.INFO);
        window.location="index.html";
    })
})
