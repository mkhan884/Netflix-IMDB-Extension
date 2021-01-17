alert("Chrome extension linked to Netflix.");

/**
 * Event listener that runs the main function everytime the url changes.
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "runExtension")
        getTitleName();
});

/**
 * Method gets the DOM elements that store the title and year.
 * Then gets the attribute 'title' that is associated with the DOM element.
 * Then gets the inner HTML of the 'year' associated with the DOM element.
 */
function getTitleName (){
    var titleDOM = document.querySelectorAll('.previewModal--player-titleTreatment-logo');
    if(titleDOM === undefined || titleDOM[0] === undefined){
        return;
    }
    var titleName = titleDOM[0].getAttribute("title");
    //console.log(titleName);

    var yearDOM = document.querySelector('.year');
    var titleYear = yearDOM.innerHTML;
    //console.log(titleYear);

    var nameYear = titleName + ";" + titleYear;
    console.log(nameYear);

}

function getIDMB (title, year){
    var request = new XMLHttpRequest();
    request.open('GET', "http://www.omdbapi.com/?t="+encodeURI(title)+"&apikey=8d0db952");
    request.onload = function (){
        console.log("Api request is working.")
    }
}