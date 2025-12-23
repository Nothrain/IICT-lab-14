const reservationForm = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');
const reserveBtn = document.getElementById('reserveBtn');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

reserveBtn.addEventListener('click', function() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    
    let isValid = true;
    let errorMessage = '';
    
    if (name.length < 2) {
        isValid = false;
        errorMessage += 'Please enter a valid name. ';
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address. ';
    }
    

    const phonePattern = /^[\d\s\-\+\(\)]+$/;
    if (!phonePattern.test(phone) || phone.length < 10) {
        isValid = false;
        errorMessage += 'Please enter a valid phone number. ';
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        isValid = false;
        errorMessage += 'Please select a future date. ';
    }

    if (!time) {
        isValid = false;
        errorMessage += 'Please select a time. ';
    }

    if (guests < 1 || guests > 12) {
        isValid = false;
        errorMessage += 'Number of guests must be between 1 and 12. ';
    }

    if (isValid) {
        formMessage.className = 'form-message success';
        formMessage.textContent = `Thank you, ${name}! Your reservation for ${guests} guest(s) on ${date} at ${time} has been received. We'll send a confirmation to ${email} shortly.`;
        formMessage.style.display = 'block';
        

        reservationForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);
    } else {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please correct the following errors: ' + errorMessage;
        formMessage.style.display = 'block';
        

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 6000);
    }
});

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
        this.style.backgroundColor = '#f8f9fa';
        this.style.padding = '0.5rem';
        this.style.borderRadius = '5px';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = 'transparent';
        this.style.padding = '0';
    });
});

const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

console.log('Savory Haven Restaurant Website Loaded Successfully!');
console.log('All interactive features are ready.');