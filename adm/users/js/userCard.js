app.userCard=function(data){
    //card container
    let card=bLib.newElement('div',[
        {
        name:'class',
        value:'user-card'
        }
    ]);
    //naam
    let name=bLib.newElement('div',[
        {
            name:'class',
            value:'user-name'
        }
    ]);
    name.innerHTML=data.vnaam+' '+data.naam;
    card.appendChild(name);
    //div modules
    let mod_list=bLib.newElement('div',[
        {
            name:'class',
            value:'mod-list'
        }
    ]);
    //list modules
    let ul_mods=bLib.newElement('ul',[       
    ]);
    card.appendChild(ul_mods);

    data.MODS.forEach(mod => {
        let li=bLib.newElement('li',[
            {
                name:'class',
                value:'li-mod'
            }
        ]);
        li.innerHTML=mod.mod_name;
        ul_mods.appendChild(li);
    });
    //add module

    let div_btns=bLib.newElement('div',[
        {
            name:'class',
            value:'mod-actions'
        }
    ]);
    card.appendChild(div_btns);
    let add_mod=bLib.newElement('button',[
        {
            name:'class',
            value:'btn-add'
        }
    ]);
    add_mod.innerHTML='MODULE TOEVOEGEN';
    div_btns.appendChild(add_mod);
    // event
    add_mod.addEventListener('click',(e)=>{
        e.preventDefault();
        app.addFromList(data.A_ID);
    })
    // return card    
    return card;

};