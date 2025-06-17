document.addEventListener('DOMContentLoaded', function() {
    // Gallery images data
    const galleryImages = [
        {
            src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'portrait',
            title: 'Elegant Portrait',
            description: 'Beautiful natural light portrait'
        },
        {
            src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'portrait',
            title: 'Soft Smile',
            description: 'Candid moment captured perfectly'
        },
        {
            src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'fashion',
            title: 'Fashion Statement',
            description: 'Stylish outfit in urban environment'
        },
        {
            src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'fashion',
            title: 'Summer Vibes',
            description: 'Bright colors and happy moments'
        },
        {
            src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'portrait',
            title: 'Professional Look',
            description: 'Corporate portrait with perfect lighting'
        },
        {
            src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'nature',
            title: 'Beach Beauty',
            description: 'Sunset at the beach with golden light'
        },
        {
            src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'fashion',
            title: 'Urban Style',
            description: 'Trendy outfit in the city'
        },
        {
            src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            category: 'nature',
            title: 'Flower Crown',
            description: 'Natural beauty with floral elements'
        }
    ];

    // DOM Elements
    const galleryContainer = document.querySelector('.gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize gallery
    function initGallery() {
        galleryContainer.innerHTML = '';
        filteredImages = galleryImages;
        
        galleryImages.forEach((image, index) => {
            createGalleryItem(image, index);
        });
        
        // Add staggered animation delays
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, i) => {
            item.style.animationDelay = `${i * 0.1}s`;
        });
    }

    // Create gallery item
    function createGalleryItem(image, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${image.category}`;
        galleryItem.setAttribute('data-index', index);
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="overlay">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryContainer.appendChild(galleryItem);
    }

    // Filter gallery
    function filterGallery(category) {
        galleryContainer.innerHTML = '';
        
        if (category === 'all') {
            filteredImages = galleryImages;
        } else {
            filteredImages = galleryImages.filter(image => image.category === category);
        }
        
        filteredImages.forEach((image, index) => {
            createGalleryItem(image, index);
        });
        
        // Reapply staggered animations
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, i) => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = 'fadeIn 0.5s ease';
            item.style.animationFillMode = 'both';
            item.style.animationDelay = `${i * 0.1}s`;
        });
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Update lightbox content
    function updateLightbox() {
        const image = filteredImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxCaption.textContent = `${image.title} - ${image.description}`;
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterGallery(button.dataset.filter);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });

    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Initialize the gallery
    initGallery();
});