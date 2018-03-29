// Checks if a given element is in the user's screen, used by the sliding list items and popping cards
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Define a list of all list items and future feature cards
var items = document.querySelectorAll(".timeline li, div.future-feature");


// This function is run on every load and scroll, throws the timeline to "iSElementInViewport"
// If the isElementInViewport returns true, the class "in-view" is added, starting the animation and being visible
// So it only adds the in-view class, for every element the addition of hte in-view class then adds certain features
// that makes the animation
function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}


// We run the code whenever the user scrolls and when the website is loaded, and when screen is resized
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);
window.addEventListener("resize", callbackFunc);



// Handles the form submission

$(document).ready(function() {

    $('#info-request').click(function () {
        // This is actually already handled by the HTML e-mail input box, but could include more complex logic which is hurray
        if ($('#subscriber_email').val().includes("@")){
            console.log("This is what is being submitted and could be thrown towards the back-end");
            console.log($('#subscriber_name').val());
            console.log($('#subscriber_email').val())
            console.log("Or, in AJAX form:");
            console.log("usabilla_test_post.asp, {name:" + $('#subscriber_name').val() + ", email: " + $('#subscriber_email').val() + "}");
            window.open(window.location.href.split('?')[0] + "?subscription-success?name=" + $('#subscriber_name').val(), '_self');
        } else {
            // This shouldn't ever be the case as the HTML e-mail input form takes care of this. But just to be 100% sure
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


// Below is my own way of dealing with a form submit, posting, and messaging. I decided to add an argument to the
// URL and use this with JQuery in order to show/hide the "success" box and display the person's name there.
// No idea if this is a formally accepted approach in web dev world, but it works relatively neatly in my opinion,
// Except for the fact that when you refresh the page once you have ?subscription-success?name=yonischirris, you'll
// get the pop-up again, which is not really required, but there should be a super simple workaround here if wanted.


// Shows the success box if the argument is given to the web address
// Checks if the url contains subscription success

if (window.location.href.indexOf("?subscription-success") == -1){
    // Checks if the url contains subscription success
    $('#successful-signup-message').hide(); // if not, it doesn't show the succes message
    // The following checks if there's something behind name=
} else if(window.location.href.split("name=")[1]){
    // if it's there, we'll check the person's name and display it in the success box
    var split_url = window.location.href.split("name=");
    var full_name = split_url[1];
    var first_name = full_name.split("%20")[0];
    $('#successfull-signup-text').prepend("Thank you " + first_name + "! ");
}
// else there's subscription success and no name, then it just displays the success box without a name



