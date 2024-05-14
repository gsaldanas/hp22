app.loadModules = function () {
    fetch(app.url.load, {
        method: 'post',
        credentials: 'same-origin'

    })
        .then(response => response.json())
        .then(data => {
            app.handleMods(data);
        })
};

app.handleMods = function (data) {
    console.log(data);
    data.forEach(element => {
        let el = app.createModCard(element);
        app.div_content.appendChild(el);
    });
}
//create module card
app.createModCard = function (data) {
    //module card
    let div_card = bLib.newElement('div', [
        {
            name: 'class',
            value: 'mod-card'
        }
    ]);
    //module naam
    let h1 = bLib.newElement('h1', [
        {
            name: 'class',
            value: 'mod-naam'
        }
    ]);
    h1.innerHTML = data.ma_naam;
    //description  
    let p = bLib.newElement('p', []);
    p.innerHTML = data.ma_omsch;
    //info
    let div_info = bLib.newElement('div', [
        {
            name: 'class',
            value: 'info'
        }
    ]);

    let span_id = bLib.newElement('span', [
        {
            name: 'class',
            value: 'id'
        }
    ]);
    span_id.innerHTML = data.MA_ID;

    let span_datum = bLib.newElement('span', [
        {
            name: 'class',
            value: 'datum'
        }
    ]);
    span_datum.innerHTML = data.datum;

    div_info.appendChild(span_id);
    div_info.appendChild(span_datum);

    //action butttons

    let div_action= bLib.newElement('div', [
        {
            name: 'class',
            value: 'action'
        }
    ]);
    //edit
    let a_edit=bLib.newElement('a',[
        {
            name:'href',
            value:'#'
        },
        {
            name:'data-id',
            value:data.MA_ID
        },
        {
            name:'data-action',
            value:'edit'
        },
        {
            name:'class',
            value:'edit btn'
        }
    ]);
    a_edit.innerHTML='EDIT';
    
    //delete

    let a_del=bLib.newElement('a',[
        {
            name:'href',
            value:'#'
        },
        {
            name:'data-id',
            value:data.MA_ID
        },
        {
            name:'data-action',
            value:'del'
        },
        {
            name:'class',
            value:'delete btn'
        }
    ]);
    a_del.innerHTML='DELETE';
// add user to module

    let a_user=bLib.newElement('a',[
        {
            name:'href',
            value:'#'
        },
        {
            name:'data-id',
            value:data.MA_ID
        },
        {
            name:'data-action',
            value:'user'
        },
        {
            name:'class',
            value:'user btn'
        }
    ]);
    a_user.innerHTML='TO USER';

    div_action.appendChild(a_edit);
    div_action.appendChild(a_del);
    div_action.appendChild(a_user);
    // add to card
    div_card.appendChild(h1);
    div_card.appendChild(p);
    div_card.appendChild(div_info);
    div_card.appendChild(div_action);
    return div_card;

}