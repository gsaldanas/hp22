const token = window.location.search.split('=')[1];
window.addEventListener("load", (event) => {

    let F = new FormData();
    F.append('TOKEN', token);

    fetch('S/checkToken.php', {
        method: 'post',
        credentials: 'same-origin',
        body: F
    })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);// remove this for producction
                if (data.EXPIRED) {
                    let h = document.querySelector('.restore-container > h1');
                    let h3= document.querySelector('.restore-container > h3');
                    let p = document.querySelector('.restore-container > p');
                    let link_box = document.querySelector('.link-login');
                    let link = link_box.querySelector('a');
                    link_box.classList.remove("no-display");

                    h.innerHTML = 'Sorry, your token expired';
                    h3.innerHTML='';
                    p.innerHTML = "We'll need to re-send your authentication email. (The link expires 30 min. after being sent.) ";

                    document.querySelector('.form-box').innerHTML = '';
                    link.innerHTML = 'Click here to try again.';
                }
            });
});




