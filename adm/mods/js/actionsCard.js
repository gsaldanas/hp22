app.div_content.addEventListener('click', function (e) {
    e.preventDefault();
    let target = e.target;
    if (target.tagName != 'A') return;

    let id = e.target.dataset.id;
    let action = e.target.dataset.action;

    switch (action) {
        case 'edit':
            console.log('edit Action ' + id);
            app.editMod(id);
            break;
        case 'del':
            console.log('delete action ' + id);
            app.deleteMod(id);
            break;
        case 'user':
            console.log('add user to module ' + id);
            app.modToUser(id);
        default:
            break;
    }

});