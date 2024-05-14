/**
 * delete
*/
app.overzicht.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.tagName !== 'I'){
        return;
    }
let aui=e.target.parentElement.dataset.aui;
  console.log(aui);
  if( window.confirm('Delete registration?')){
    let F=new FormData();
    F.append('aui',aui);
    fetch(app.url.delete,{
        method:'post',
        credentials:'same-origin',
        body:F
    })
    .then(resp=>resp.json())
    .then(data=>{
        console.log(data);
        alert(data.INFO);
        app.getOverzicht();
    })
  }
 })