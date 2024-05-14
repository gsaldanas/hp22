app.getOverzicht = () => {

    fetch(app.url.get_data, {
        method: 'post',
        credentials: 'same-origin'
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            app.displayOverzichtAct(data);
        })
}
/**
 *  overzicht card
 */
app.overzichtCard = (entry)=>{
    let card = bLib.newElement('div', [
        {
            name: 'class',
            value: 'act-card'
        }
    ]);
    /**
     * delete
     */
    let a=bLib.newElement('a',[
        {
            name:'href',
            value:'#'
        },
        {
            name:'class',
            value:'del-entry'
        },
        {
            name:'data-aui',
            value:entry.AUI_ID
        }
    ]);
    a.innerHTML='<i class="far fa-trash-alt"></i>';
    card.appendChild(a);

    let type = bLib.newElement('div', [
        {
            name: 'class',
            value: 'type-act'
        }
    ]);

    let name = bLib.newElement('div', [
        {
            name: 'class',
            value: 'act-name'
        }
    ]);
    name.innerHTML = entry.ACT_NAME
    let datum = bLib.newElement('div', [
        {
            name: 'class',
            value: 'datum-reg'
        }
    ]);
    datum.innerHTML=entry.TIMELAPSE;

    let freq = bLib.newElement('div', [
        {
            name: 'class',
            value: 'frequency'
        }
    ]);
    let aantal = bLib.newElement('div', [
        {
            name: 'class',
            value: 'aantal-keer'
        }
    ]);
    aantal.innerHTML='<i class="far fa-calendar"></i><span class="green">  '+entry.FREQUENCY+'</span>  keer per week';

    let time = bLib.newElement('div', [
        {
            name: 'class',
            value: 'time'
        }
    ]);
    time.innerHTML='<i class="far fa-clock"></i><span class="green">  '+entry.TIME +'</span> min per sessie';
/**
 * wiring
 */
  card.appendChild(type);
  type.appendChild(name);
  type.appendChild(datum);

  card.appendChild(freq);
  freq.appendChild(aantal);
  freq.appendChild(time);

  return card;

}
/**
 * display overzicht
 */

app.displayOverzichtAct=(data)=>{
    app.overzicht.innerHTML='';
    data.forEach(element => {
        let card=app.overzichtCard(element);
        app.overzicht.appendChild(card);
    });
}