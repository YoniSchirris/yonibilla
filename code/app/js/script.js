
// Checks if a given element is in the user's screen
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Define a list of all list items
var items = document.querySelectorAll(".timeline li");


// This function is run on every load and scroll, throws the timeline to "iSElementInViewport"
// If the isElementInViewport returns true, the class "in-view" is added, starting the animation and being visible
function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}


// We run the code whenever the user scrolls and when the website is loaded
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);