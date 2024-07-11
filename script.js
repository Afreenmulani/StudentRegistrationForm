document.getElementById("registrationForm").onsubmit = function(event) {
    event.preventDefault();
    if (validateForm()) {
        sendMail();
    }
};

function validateForm() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var gender = document.getElementById("gender").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(?!123|234|345|456|567|678|789)\d{10}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const namePattern = /^[A-Za-z]+$/;  

    if (!firstname || !lastname || !email || !phone || !gender || !dob || !address || !username || !password) {
        alert('Please fill out all fields.');
        return false;
    } else if (!namePattern.test(firstname)) {
        alert('First name must contain only letters and cannot include spaces or special characters.');
        return false;
    } else if (!namePattern.test(lastname)) {
        alert('Last name must contain only letters and cannot include spaces or special characters.');
        return false;
    } else if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    } else if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number with 10 digits that does not start with sequential numbers like 123.');
        return false;
    } else if (username.length < 5) {
        alert('Username must be at least 5 characters long.');
        return false;
    } else if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
    }
    return true;
}

function sendMail() {
    var params = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        address: document.getElementById("address").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    var templateParams = {
        firstname: params.firstname,
        lastname: params.lastname,
        to_email: params.email, 
        phone: params.phone,
        gender: params.gender,
        dob: params.dob,
        address: params.address,
        username: params.username,
        password: params.password
    };

    emailjs.send("service_qkytrfq", "template_nlqtv8h", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Registration Email Successfully Sent!');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send email. Please try again.');
        });
}
