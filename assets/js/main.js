// Main JavaScript for VIPO Product Page

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // גלילה לראש העמוד בעת טעינה
    window.scrollTo(0, 0);
    
    // Initialize Swiper
    initSwiper();
    
    // Initialize Countdown
    initCountdown();
    
    // Initialize Share functionality
    initShareButtons();
});

// Initialize product gallery swiper
function initSwiper() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
    });
}

// Initialize Countdown Timer
function startCountdown() {
    // Set the date we're counting down to (24 hours from now)
    const countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 24);

    // Update the countdown every 1 second
    const x = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();

        // Find the distance between now and the countdown date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');

        // If the countdown is finished, display expired message
        if (distance < 0) {
            clearInterval(x);
            document.querySelector('.countdown-timer').innerHTML = '<div class="expired">המבצע הסתיים!</div>';
        }
    }, 1000);
}

// Format time to always show two digits (e.g., 01 instead of 1)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Initialize share buttons
function initShareButtons() {
    // WhatsApp share
    document.querySelector('.btn-whatsapp').addEventListener('click', function(e) {
        e.preventDefault();
        const text = 'בדקו את המוצר המדהים הזה! הצטרפו לקבוצת הרכישה עם הקוד שלי: VIPO-FRIEND-123';
        const url = window.location.href;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    });
    
    // Facebook share
    document.querySelector('.btn-facebook').addEventListener('click', function(e) {
        e.preventDefault();
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    });
    
    // Telegram share
    document.querySelector('.btn-telegram').addEventListener('click', function(e) {
        e.preventDefault();
        const text = 'בדקו את המוצר המדהים הזה! הצטרפו לקבוצת הרכישה עם הקוד שלי: VIPO-FRIEND-123';
        const url = window.location.href;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    });
    
    // Email share
    document.querySelector('.btn-email').addEventListener('click', function(e) {
        e.preventDefault();
        const subject = 'מוצר מדהים שחשבתי שיעניין אותך';
        const body = `היי,\n\nבדקו את המוצר המדהים הזה! הצטרפו לקבוצת הרכישה עם הקוד שלי: VIPO-FRIEND-123\n\n${window.location.href}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Copy to clipboard function
function copyToClipboard() {
    const couponCode = document.getElementById('couponCode');
    const copyMessage = document.getElementById('copyMessage');
    
    couponCode.select();
    document.execCommand('copy');
    
    // Modern clipboard API (fallback to execCommand)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(couponCode.value)
            .then(() => {
                showCopyMessage();
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        showCopyMessage();
    }
    
    function showCopyMessage() {
        copyMessage.style.opacity = '1';
        copyMessage.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            copyMessage.style.opacity = '0';
            copyMessage.style.transform = 'translateY(-10px)';
        }, 2000);
    }
}
