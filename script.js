/**
 * Just to make sure that the scripts are working on the extension.
 */
alert("Chrome extension linked to Netflix.");

/**
 * Event listener that runs the 'getTitleName' function everytime the url updates.
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

    var updatedTitle = titleName.replace(/ /g, "+");
    getSecondIMDB(updatedTitle).then(data => {
        var ratingsArray = data.Ratings;
        var ratingJSON = ratingsArray[0];
        var ratingValue = ratingJSON.Value;
        var ratingSplit = ratingValue.split("/");
        var rating = ratingSplit[0];
        //console.log(rating);
        addIMDBRating(rating);
    })
    .catch(error => console.log(error));
}

async function getSecondIMDB(title){
    let response = await fetch('https://www.omdbapi.com/?t='+title+'&apikey=8d0db952');
    let data = await response.json();
    return data;
}

function addIMDBRating(rating){
    var infoContainer = document.querySelector('.videoMetadata--container');
    var div = document.createElement('div');
    div.className = 'imdbRating';
    div.innerHTML = 'IMDB: ' + rating;
    infoContainer.appendChild(div);
}