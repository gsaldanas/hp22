app.displayActivity = function () {
    fetch(app.url.activity, {
        method: 'post',
        credentials: 'same-origin'
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if(data.length == 0){ return; }
            app.loadTheActivity(data);
        })
}
/**
 * Activity card
 */
app.activityCard = function (act) {
    let div = bLib.newElement('div', [
        {
            name: 'class',
            value: 'activity-card'
        },
        {
            name: 'data-cid',
            value: act.AC_ID
        }
    ]);
    let img = bLib.newElement('img', [
        {
            name: 'src',
            value: app.url.img_path + act.IMAGE
        },
        {
            name: 'alt',
            value: act.TITEL
        }
    ]);
    let p = bLib.newElement('p', [
        {
            name: 'class',
            value: 'titel'
        }
    ]);
    p.innerHTML = act.TITEL;

    div.appendChild(img);
    div.appendChild(p);

    return div;
}

app.loadTheActivity = function (data) {
    let h3=document.createElement('h3');
    h3.innerHTML='Mijn Activiteit';
    let card = app.activityCard(data);
    
    card.addEventListener('click',(e)=>{
        window.location='../mijnActies/';
    })

    app.actions.appendChild(h3);
    app.actions.appendChild(card);
}