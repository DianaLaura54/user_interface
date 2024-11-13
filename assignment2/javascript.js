
document.addEventListener('DOMContentLoaded', function () {
   
    const contactForm = document.getElementById('contactForm');

    
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

       
        const surname = document.getElementById('surname').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const address = document.getElementById('address').value.trim();
        const birthDate = document.getElementById('birthDate').value;
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const favoriteColor = document.getElementById('favoriteColor').value;

    
        let errorFlag = false;

        if (surname === '') {
            alert('Please enter your surname.');
            errorFlag = true;
        }

        if (firstName === '') {
            alert('Please enter your first name.');
            errorFlag = true;
        }

        if (address === '') {
            alert('Please enter your address.');
            errorFlag = true;
        }

        if (birthDate === '') {
            alert('Please enter your birth date.');
            errorFlag = true;
        }

        if (!validatePhone(phone)) {
            alert('Please enter a valid phone number.');
            errorFlag = true;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email.');
            errorFlag = true;
        }

        
        if (!errorFlag) {
           
            console.log('Form Submitted Successfully!');
            console.log({
                surname: surname,
                firstName: firstName,
                address: address,
                birthDate: birthDate,
                phone: phone,
                email: email,
                favoriteColor: favoriteColor
            });

           
            alert('Form submitted successfully!');
        }
    });

   
    function validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }


    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
