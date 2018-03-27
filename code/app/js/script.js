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
var items = document.querySelectorAll(".timeline li, div.future-feature");


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
            //$('#info-request').pre
            console.log("This is what is being submitted and could be thrown towards the back-end");
            console.log($('#subscriber_name').val());
            console.log($('#subscriber_email').val())
            console.log("Or, in AJAX form:");
            console.log("usabilla_test_post.asp, {name:" + $('#subscriber_name').val() + ", email: " + $('#subscriber_email').val() + "}");
            window.open(window.location.href.split('?')[0] + "?subscription-success?name=" + $('#subscriber_name').val(), '_self');


        } else {
            alert("That doesn't look like an e-mail address. Please fill in your e-mail address");
            return false;
        }
    })
})


// AJAX Post request. This is currently not run as we don't have a server to communicate with.

function postNameAndEmailToServer() {

        // The actual data that's posted, then awaits a response
    $.post("usabilla_test_post.asp",
        {
            name: $('#subscriber_name').val(),
            city: $('#subscriber_email').val()
        },

        // Below shows responses for whenever we really start testing
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}


// Shows the success box if the argument is given to the web address

if (window.location.href.indexOf("?subscription-success") == -1){
    $('#successful-signup-message').hide();
    // The following checks if there's something behind name=
} else if(window.location.href.split("name=")[1]){
    var split_url = window.location.href.split("name=");
    var full_name = split_url[1];
    var first_name = full_name.split("%20")[0];
    $('#successfull-signup-text').prepend("Thank you " + first_name + "! ");
}



