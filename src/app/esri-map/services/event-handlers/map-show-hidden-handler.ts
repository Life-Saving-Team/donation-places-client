export function addShowHiddenItemsHandler(view) {
    view.popup.on("trigger-action", (event) => {
        if (event.action.id === "show-hidden") {
            showHiddenItemsFromDom(view)
        }
    });
}


export function showHiddenItemsFromDom(view){
    let som = document.querySelector('.esri-popup-renderer').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
    const telephone = som.childNodes[3].childNodes[1].childNodes[0].attributes['data'].value
    const email = som.childNodes[4].childNodes[1].childNodes[0].attributes['data'].value
    let myContainer =   <HTMLElement> som.childNodes[3].childNodes[1].childNodes[0]
    myContainer.innerText = telephone
    myContainer =   <HTMLElement> som.childNodes[4].childNodes[1].childNodes[0]
    myContainer.innerText = email
    
}