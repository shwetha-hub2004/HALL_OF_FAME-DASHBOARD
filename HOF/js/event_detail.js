// Event detail page specific JavaScript

// Parse query parameter eventId
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchEventDetail(eventId) {
    try {
        console.log('Fetching event details for eventId:', eventId);
        const response = await fetch('api/get_events.php');
        const data = await response.json();
        console.log('Data received from API:', data);
        if (!data) {
            document.getElementById('event-container').innerHTML = '<p>Event not found.</p>';
            return;
        }
        const eventIdInt = parseInt(eventId, 10);
        let event = null;
        for (const category in data) {
            if (data.hasOwnProperty(category)) {
                console.log('Searching in category:', category);
                data[category].forEach(e => console.log('Event id:', e.id));
                event = data[category].find(e => e.id == eventIdInt);
                if (event) break;
            }
        }
        if (!event) {
            document.getElementById('event-container').innerHTML = '<p>Event not found.</p>';
            return;
        }

        const container = document.getElementById('event-container');
        container.innerHTML = '';

        // Event header
        const header = document.createElement('div');
        header.className = 'profile-header fade-in';
        header.innerHTML = `
            <img src="${event.image || 'images/default_event.jpg'}" alt="${event.title}" />
            <div class="name-quote">
                <h2>${event.title}</h2>
                <blockquote>${event.subtitle || ''}</blockquote>
            </div>
        `;
        container.appendChild(header);

        // Description section
        const descriptionSection = document.createElement('section');
        descriptionSection.className = 'fade-in';
        descriptionSection.innerHTML = `
            <h3>Description</h3>
            <p>${event.description || 'No description available.'}</p>
        `;
        container.appendChild(descriptionSection);

        // Date section
        const dateSection = document.createElement('section');
        dateSection.className = 'fade-in';
        dateSection.innerHTML = `
            <h3>Date</h3>
            <p>${event.date || 'Date not specified.'}</p>
        `;
        container.appendChild(dateSection);

        // Location section (if available)
        if (event.location) {
            const locationSection = document.createElement('section');
            locationSection.className = 'fade-in';
            locationSection.innerHTML = `
                <h3>Location</h3>
                <p>${event.location}</p>
            `;
            container.appendChild(locationSection);
        }

        // Speakers section (if available)
        if (event.speakers && event.speakers.length > 0) {
            const speakersSection = document.createElement('section');
            speakersSection.className = 'fade-in';
            speakersSection.innerHTML = '<h3>Speakers</h3>';
            const speakersList = document.createElement('ul');
            event.speakers.forEach(speaker => {
                const li = document.createElement('li');
                li.textContent = speaker;
                speakersList.appendChild(li);
            });
            speakersSection.appendChild(speakersList);
            container.appendChild(speakersSection);
        }

        // Gallery section (if available)
        if (event.gallery && event.gallery.length > 0) {
            const gallerySection = document.createElement('section');
            gallerySection.className = 'fade-in';
            gallerySection.innerHTML = '<h3>Gallery</h3>';
            const galleryGrid = document.createElement('div');
            galleryGrid.className = 'gallery-grid';
            event.gallery.forEach(imgPath => {
                const img = document.createElement('img');
                img.src = imgPath;
                img.alt = 'Gallery image';
                img.className = 'gallery-img';
                galleryGrid.appendChild(img);
            });
            gallerySection.appendChild(galleryGrid);
            container.appendChild(gallerySection);
        }

        // Setup fade-in on scroll and lightbox
        setupScrollFadeIn();
        setupLightbox();

    } catch (error) {
        document.getElementById('event-container').innerHTML = '<p>Error loading event details.</p>';
        console.error('Error fetching event details:', error);
    }
}

// Scroll fade-in animation
function setupScrollFadeIn() {
    const faders = document.querySelectorAll('.fade-in');
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    faders.forEach(fader => {
        observer.observe(fader);
    });
}

// Lightbox setup
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-img')) {
            lightbox.style.display = 'block';
            lightboxImg.src = e.target.src;
            caption.textContent = e.target.alt || '';
        }
    });

    closeBtn.onclick = () => {
        lightbox.style.display = 'none';
    };

    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    };
}

// Call fetchEventDetail on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const eventId = getQueryParam('eventId');
    if (eventId) {
        fetchEventDetail(eventId);
    } else {
        document.getElementById('event-container').innerHTML = '<p>No event specified.</p>';
    }
});
