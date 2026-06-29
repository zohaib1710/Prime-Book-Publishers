document.addEventListener("DOMContentLoaded", function() {
    var clickButton = document.querySelector('.clickbutton');
    var formContainer = document.querySelector('.banner-form');
    var isOpen = false; // Track if the form is open or closed

    if (!clickButton || !formContainer) {
        return;
    }

    // Initially hide the form
    formContainer.style.display = 'none';

    // Add click event listener to the button
    clickButton.addEventListener('click', function() {
        if (!isOpen) {
            // Show form and move button to the right of form
            formContainer.style.display = 'block';
            clickButton.style.right = '400px'; // Adjust based on form width
            isOpen = true;
        } else {
            // Hide form and move button back
            formContainer.style.display = 'none';
            clickButton.style.right = '0'; // Reset button position
            isOpen = false;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
var clickButton = document.querySelector('.clickbutton');
var formContainer = document.querySelector('.banner-form');
var isOpen = false; // Variable to track if the form is open or closed

if (!clickButton || !formContainer) {
    return;
}

// Initially hide the form
formContainer.style.display = 'none';

// Add a click event listener to the button
clickButton.addEventListener('click', function() {
if (!isOpen) {
    // Show the form and move the button to the right of the form
    formContainer.style.display = 'block';
    clickButton.style.right = '370px'; // Adjust this based on form width
    isOpen = true;
} else {
    // Hide the form and move the button back to its original position
    formContainer.style.display = 'none';
    clickButton.style.right = '0'; // Reset the button position
    isOpen = false;
}
});
});
