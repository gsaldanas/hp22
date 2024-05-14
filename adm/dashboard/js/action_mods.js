window.addEventListener('load', () => {
    bLib.clearEl(app.modules)
    app.loadMods();
});
//click module/
app.modules.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    console.log(target);
    let path = '';

    if (target.tagName != 'I') {
        if (target.tagName != 'H3') {
            if (target.tagName != 'DIV') {
                return;
            }
        }
    }
    if (target.tagName == 'I') {
        let parent = target.parentElement;
        console.log(parent);
        path = parent.dataset.path;
    } else {
        path = e.target.dataset.path;
    }
    let url = 'https://' + document.domain + path;
    document.location = url;
});