const itemsPerPage = 9;
let currentPage = 1;
let galleryImages = [];

// Gallery page specific JavaScript

function fetchGallery() {
    fetch('api/get_scientists.php')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            if (!Array.isArray(data) || data.length === 0) {
                contentDiv.innerHTML = '<p>No gallery images found.</p>';
                return;
            }
            galleryImages = [];
            data.forEach(scientist => {
                if (scientist.gallery && Array.isArray(scientist.gallery)) {
                    galleryImages = galleryImages.concat(scientist.gallery);
                }
            });

            if (galleryImages.length === 0) {
                contentDiv.innerHTML = '<p>No gallery images found.</p>';
                return;
            }

            renderGalleryPage(currentPage);
            setupLightbox();
            setupPagination();
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<p>Error loading gallery images.</p>';
            console.error('Error fetching gallery images:', error);
        });
}

function renderGalleryPage(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageImages = galleryImages.slice(startIndex, endIndex);

    if (pageImages.length === 0) {
        contentDiv.innerHTML = '<p>No gallery images found.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'image-grid';

    pageImages.forEach(imgPath => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = 'Gallery Image';
        img.className = 'gallery-img';
        img.tabIndex = 0;
        grid.appendChild(img);
    });

    contentDiv.appendChild(grid);
}

function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(galleryImages.length / itemsPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'pagination-btn';
        if (i === currentPage) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            currentPage = i;
            renderGalleryPage(currentPage);
        });
        paginationContainer.appendChild(btn);
    }
}

function setupLightbox() {
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.style.display = 'none';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => {
            lightbox.style.display = 'none';
        };

        const img = document.createElement('img');
        img.id = 'lightbox-img';
        img.className = 'lightbox-content';

        lightbox.appendChild(closeBtn);
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        lightbox.onclick = (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        };
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-img')) {
            lightbox.style.display = 'block';
            document.getElementById('lightbox-img').src = e.target.src;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGallery();
});
