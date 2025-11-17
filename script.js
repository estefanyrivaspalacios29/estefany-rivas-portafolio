// Animación de barras de habilidades
document.addEventListener('DOMContentLoaded', function() {
    console.log('EmailJS initialized:', emailjs);
    console.log('Service ID: service_qfufy9x');
    console.log('Template ID: template_tv738r4');
    console.log('Contact form found:', document.getElementById('contact-form'));
    
    // Animación de barras de progreso
    const progressBars = document.querySelectorAll('.progreso');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // EMAILJS - Formulario de contacto MEJORADO
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const submitBtn = this.querySelector('.btn-enviar');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            
            // Ocultar mensajes anteriores
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Mostrar loading
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Obtener datos del formulario
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to_email: 'estefany.rivas2025@adoc.superate.org.sv'
            };
            
            console.log('Enviando formulario con datos:', formData);
            
            try {
                // Crear timeout de 15 segundos
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Timeout: Request took too long')), 15000);
                });
                
                // Enviar email con EmailJS
                const emailPromise = emailjs.send('service_qfufy9x', 'template_tv738r4', formData);
                
                // Esperar a que se complete el envío o timeout
                const response = await Promise.race([emailPromise, timeoutPromise]);
                
                console.log('SUCCESS!', response);
                
                // Éxito
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Cambiar botón a éxito temporalmente
                btnLoading.style.display = 'none';
                btnText.textContent = 'Message Sent!';
                btnText.style.display = 'inline';
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 3000);
                
            } catch (error) {
                console.log('FAILED...', error);
                
                // Manejar error
                let errorMsg = '❌ Error sending message. Please try again.';
                
                if (error.message.includes('Timeout')) {
                    errorMsg = '❌ Request took too long. Please check your connection and try again.';
                } else if (error.status === 0) {
                    errorMsg = '❌ Network error. Please check your internet connection.';
                }
                
                errorMessage.textContent = errorMsg;
                errorMessage.style.display = 'block';
                
                // Restaurar botón
                btnLoading.style.display = 'none';
                btnText.style.display = 'inline';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Efecto de carga inicial
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});