
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




// Handles the form submission

$(document).ready(function() {

    $('#info-request').click(function () {
        if ($('#subscriber_email').val().includes("@")){
            console.log("This is what is being submitted and could be thrown towards the back-end");
            console.log($('#subscriber_email').val())
    } else {
            alert("That doesn't look like an e-mail address. Please fill in your e-mail address");
            return false;


        }



    })

})



// AJAX Post request

function postNameAndEmailToServer() {
    $.post("usabilla_test_post.asp",
        {
            name: $('#subscriber_name').val(),
            city: $('#subscriber_email').val()
        },

        //Below shows responses for whenever we really start testing
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}
