$(document).ready(function() {
    // Function to check if the user has the role '3M Team' and hide the timeline element if true
    function checkAndHideTimeline() {
        // Check if the user explicitly has the role '3M Team' and is not an Administrator
        if (frappe.user.has_role('3M Team') === true && frappe.session.user !== 'Administrator') {
            // Hide the timeline element
            hideTimeline();
        } else {
            // Log a message indicating that the user does not have the '3M Team' role or is an Administrator
            console.log("User does not have the '3M Team' role or is an Administrator. Not hiding the section.");
        }
    }

    // Function to hide the timeline element
    function hideTimeline() {
        var timelineElement = $('.new-timeline');
        if (timelineElement.length) {
            timelineElement.hide();
            // Log a message indicating that the timeline element is hidden
            console.log("Timeline element is hidden.");
        } else {
            // Log a message indicating that the timeline element is not found
            console.log("Timeline element not found.");
        }
    }

    // Initial check for the '3M Team' role and hide the timeline element
    checkAndHideTimeline();

    // Set up a MutationObserver to watch for changes in the DOM and hide the timeline element if added later
    var observer = new MutationObserver(function(mutations, me) {
        if (frappe.user.has_role('3M Team') === true && frappe.session.user !== 'Administrator') {
            // If the user has the '3M Team' role and is not an Administrator, hide the timeline element
            hideTimeline();
        } else {
            // If the user does not have the '3M Team' role or is an Administrator, stop observing
            me.disconnect();
        }
    });

    // Start observing the document for changes
    observer.observe(document, {
        childList: true,
        subtree: true
    });
});
