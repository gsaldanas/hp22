app.btn_list.addEventListener('click', (e) => {
    e.preventDefault();
    app.clearPlayground();
    fetch(app.url.get_users, {
        method: 'post',
        credentials: 'same-origin'
    })
        .then((response) => response.json())
        .then((data) => {
            app.handleListUsers(data);
        })
});

app.handleListUsers = function (data) {
    console.log(data);
    //check status
    app.checkStatus(data.STATUS,data.ACCESS);
    bLib.clearEl(app.div_content);
    let ul = app.getUl('user-list');
    data.forEach(user => {
        let li = app.getUserCard(user);
        ul.appendChild(li);
    });
    app.div_content.appendChild(ul);
}
//--UL----
app.getUl = function (klass) {
    let ul = bLib.newElement('ul', [
        {
            name: 'class',
            value: klass
        }
    ]);
    ul.addEventListener('click',(e)=>{
        e.preventDefault();
        let target=e.target;
        let  tag=target.tagName;
        switch (tag) {
            case 'A':
                app.resetPwd(target.dataset.reset,target.dataset.name_user);
                break;
            case 'SPAN':
                app.deleteUser(target.dataset.uid);
                break;
            case 'EM':
                app.toonUserMods(target.dataset.uid);
                break;
            default:
                return;
                break;
        }

    })
    return ul;
}
//--User card
app.getUserCard = function (user) {
    let li = bLib.newElement('li', [
        {
            name: 'class',
            value: 'user-card'
        }
    ]);
    li.innerHTML = user.vnaam + ' ' + user.naam+' | ' + user.email ;
     //  vieuw modules user
     let em=bLib.newElement('em',[
         {
             name:'data-uid',
             value:user.A_ID
         }
     ]);
     em.innerHTML='MODULES';
     li.appendChild(em);

    //reset password
    let a_reset = bLib.newElement('a', [
        {
            name: 'href',
            value: '#'
        },
        {
            name:'class',
            value:'reset'
        },
        {
            name: 'data-reset',
            value: user.A_ID
        },
        {
            name:'data-name_user',
            value:user.vnaam + ' ' + user.naam
        }
    ]);
    a_reset.innerHTML = 'Reset wachtwoord'
    li.appendChild(a_reset);
    //btn delete
    let span = bLib.newElement('span', [
        {
            name: 'class',
            value: 'span-btn'
        },
        {
            name: 'data-uid',
            value: user.A_ID
        }
    ]);
    span.innerHTML = 'DEL';
    li.appendChild(span);
    return li;
}