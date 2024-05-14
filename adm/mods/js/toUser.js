app.modToUser = function (mid) {
    fetch(app.url.users, {
        method: 'post',
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(data => {
            app.displayUsers(data, mid);
        })
}
// toont users 
app.displayUsers = function (data, mid) {
    console.log(data);
    bLib.clearEl(app.div_users);
    document.location = '#users_list';
    data.forEach(element => {
        let el = app.createUserCard(element, mid);
        app.div_users.appendChild(el);
    });
}
//create user card
app.createUserCard = function (user, mid) {
    //user card
    let div_user = bLib.newElement('div', [
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
    h1.innerHTML = user.vnaam + ' ' + user.naam;
    //div modules  
    let div_mods = bLib.newElement('div', [
        {
            name: 'class',
            value: 'mods-user'
        }
    ]);
    //create list modules users if any //todo
    let ul = bLib.newElement('ul', [

        {
            name: 'class',
            value: 'ul-mods'
        }
    ])
    if (user.MODS.length > 0) {
        user.MODS.forEach(mod => {
            let li = bLib.newElement('li', [
                {
                    name: 'class',
                    value: 'li-mod'
                }
            ]);
            //button delete from user
            let span = bLib.newElement('span', [
                {
                    name: 'class',
                    value: 'span-mod'
                },
                {
                    name: 'data-umid',
                    value: mod.UM_ID
                },
                {

                    name: 'data-uid',

                    value: user.A_ID
                },
            ]);
            span.innerHTML = 'Remove'
            li.innerHTML = mod.mod_name;
            li.appendChild(span);
            ul.appendChild(li);
        });
        div_mods.appendChild(ul);
    }
    //action buttton
    let a_mod = bLib.newElement('a', [
        {
            name: 'class',
            value: 'btn'
        },
        {
            name: 'href',
            value: '#'
        },
        {
            name: 'data-uid',
            value: user.A_ID
        },
        {
            name: 'data-mid',
            value: mid
        }
    ]);
    a_mod.innerHTML = 'USER TO MODULE ' + mid;

    div_user.appendChild(h1);
    div_user.appendChild(div_mods);
    div_user.appendChild(a_mod);

    return div_user;

}