document.addEventListener('DOMContentLoaded', function() {
    const watchData = [
        {
            heading: "Exquisite Watches",
            subHeading: "Gold Luxury, Choose Us",
            description: "Discover the Perfect Watch for Every Occasion and Elevate Your Style with Timeless Elegance and Precision Craftsmanship - watch.",
            price: "$499.00",
            gradient: "linear-gradient(106deg, #F4A764 -2.93%, #FFDEC2 72.14%)"
        },
        {
            heading: "Dainty Timepieces",
            subHeading: "Silver Luxury, Choose Us",
            description: "Explore the Ideal Timepiece for Any Moment and Enhance Your Style with Timeless Sophistication and Impeccable Craftsmanship - timepiece.",
            price: "$469.00",
            gradient: "linear-gradient(105.54deg, #ADB0B0 -2.93%, #E1E1E1 72.14%)"

        },
        {
            heading: "Elegant Timepieces",
            subHeading: "Choose Luxury, Choose Us",
            description: "Discover the Perfect Watch for Every Occasion and Elevate Your Style with Timeless Elegance and Precision Craftsmanship - watch.",
            price: "$529.00",
            gradient: "linear-gradient(105.54deg, #30A357 -2.93%, #75E39A 72.14%)"

        },
        {
            heading: "Refined Timepieces",
            subHeading: "Choose Luxury, Choose Us",
            description: "Explore the Ideal Timepiece for Any Moment and Enhance Your Style with Timeless Sophistication and Impeccable Craftsmanship - timepiece.",
            price: "$599.00",
            gradient: "linear-gradient(105.54deg, #F24F4F -2.93%, #FFA895 72.14%)"

        }
    ];

    let splide;
    try {
        splide = new Splide('.splide', {
            type: 'fade',
            rewind: true,
            arrows: true,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            pauseOnFocus: true,
            pagination: false,
        });

        splide.on('moved', function(newIndex) {
            updateContent(newIndex);
        });

        splide.mount();
    } catch (error) {
        console.error('Error initializing Splide:', error);
    }

    function updateContent(index) {
        if (index < 0 || index >= watchData.length) {
            console.error('Invalid index:', index);
            return;
        }

        const data = watchData[index];
        
        document.getElementById('main-heading').textContent = data.heading;
        document.getElementById('sub-heading').innerHTML = `<span class="gold-luxury">${data.subHeading.split(',')[0]},</span> <span class="choose-us" style="color: black;">Choose Us</span>`;
        document.getElementById('watch-description').textContent = data.description;
        document.getElementById('watch-price').textContent = data.price;
        
        document.body.style.transition = 'background 0.5s ease';
        document.body.style.background = data.gradient;
        
        document.querySelectorAll('nav ul li a, .social-icons a').forEach(el => {
            el.style.transition = 'color 0.5s ease, border-color 0.5s ease';
            el.style.color = textColor;
            if (el.classList.contains('social-icons')) {
                el.style.borderColor = textColor;
            }
        });
    }

    function getBrightness(gradient) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const grd = ctx.createLinearGradient(0, 0, 200, 0);
        const colors = gradient.match(/#[a-f\d]{6}|#[a-f\d]{3}|rgb$$\s*\d+\s*,\s*\d+\s*,\s*\d+\s*$$/gi);
        colors.forEach((color, index) => {
            grd.addColorStop(index / (colors.length - 1), color);
        });
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 200, 1);
        const imageData = ctx.getImageData(0, 0, 200, 1).data;
        let totalBrightness = 0;
        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            totalBrightness += (r * 299 + g * 587 + b * 114) / 1000;
        }
        return totalBrightness / (imageData.length / 4);
    }

    document.querySelector('.sign-up').addEventListener('click', function() {
        alert('Sign up functionality to be implemented');
    });

    updateContent(0);
});
