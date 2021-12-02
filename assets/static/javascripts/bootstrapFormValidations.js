// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to,
//  here we select all forms on the page with the class 'needs-validation-check'
const forms = document.querySelectorAll('.needs-validation-check')

// Create an array from the http collection returned from querySelectorAll, loop through
//  each form and put an eventListener on it that listends for submit; when activated, the event listener 
//  checks if the form is valid, and if its not, it prevents submission (prevent defualt), and stops the event
//  from bubbling up 
Array.from(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();
// This () is at the end because we're defining a function and applying it in one go