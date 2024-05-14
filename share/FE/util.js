let bLib={   
}
//UTIL

bLib.showDiv = function (el) {
    el.style.display = 'block';
}
bLib.hideDiv = function (el) {
    el.style.display = 'none';
}
//create element 
bLib.newElement = function (tag, atts) {
    let el = document.createElement(tag);
    atts.forEach(att => {
        el.setAttribute(att.name, att.value);
    })
    return el;
}
//clear inner html 
bLib.clearEl=function(el){
    el.innerHTML='';
}
//clear many 
//param array of elements
bLib.clearManyEls=function(elements){
    elements.forEach(el=>{
        el.innerHTML='';
    })
}
bLib.decodeHtml=function (text) {
  let textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}