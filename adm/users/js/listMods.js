/**
 * Laad de lijst of beschikbare modules.
 * @requires  init.js ,  url.available_mods.
 * @async
 * @param {number} uid user id
 * @fires app.createModsList(uid,data) 
 */
app.addFromList = function (uid) {
    //get de available mods
    fetch(app.url.available_mods, {
        method: 'post',
        credentials: 'same-origin'
    })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            app.createModsList(uid, data);
        })
};
/**
 * Maakt een lijst van de modules met een chekbox
 * om modules toe te voegen aan use
 * @param {numbe} uid
 * @param {Array} data array van objecten (json)
 */
app.createModsList = function (uid, data) {
    let ul = document.createElement('ul');
    data.forEach(mod => {
        let li = app.createCheckboxModule(uid, mod);
        ul.appendChild(li);
    });
    //event listener
    ul.addEventListener('click', (e) => {
        let target = e.target;
        console.log(target);
        let tag = target.tagName;
        if(tag != 'INPUT')return;
        //input klik
        let mid=target.dataset.mid;
        let user=target.dataset.user;
        console.log(mid+' ->' +user)

    })
    // add to container
    app.div_modules.appendChild(ul);
};
/**
 * Create li module met checkbox
 */
app.createCheckboxModule = function (uid, mod) {
    let li = bLib.newElement('li', [
        {
            name: 'class',
            value: 'mod-check'
        }
    ]);
    li.innerHTML = mod.ma_omsch;
    //checkbox
    let box = bLib.newElement('input', [
        {
            name: 'type',
            value: 'checkbox'
        },
        {
            name: 'name',
            value: 'mid'
        },
       
        {
            name: 'data-user',
            value: uid
        },
        {
            name:'data-mid',
            value:mod.MA_ID
        }
    ]);

    li.appendChild(box);
    return li;

}
