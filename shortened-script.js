const form = document.getElementById("admissionForm");
const success = document.getElementById("success-message");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    let name = document.getElementById("fullName");
    let email = document.getElementById("email");
    let course = document.getElementById("course");
    let terms = document.getElementById("terms");

    if (name.value.trim() == "") {
        document.getElementById("fullNameError").textContent =
            "Full Name is required";
        valid = false;
    }

    if (email.value.trim() == "") {
        document.getElementById("emailError").textContent =
            "Email is required";
        valid = false;
    }

    if (course.value == "") {
        document.getElementById("courseError").textContent =
            "Select a course";
        valid = false;
    }

    if (!terms.checked) {
        document.getElementById("termsError").textContent =
            "Accept the terms";
        valid = false;
    }

    if (valid)
        success.classList.remove("hidden");
});