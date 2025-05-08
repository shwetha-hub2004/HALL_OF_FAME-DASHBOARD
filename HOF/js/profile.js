// Profile page specific JavaScript

// Fetch profile details by id from URL and render
function fetchProfile() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
        document.getElementById('profile-container').innerHTML = '<p>No profile ID provided.</p>';
        return;
    }
    fetch('api/get_scientist_detail.php?id=' + encodeURIComponent(id))
        .then(response => response.json())
        .then(data => {
            if (!data || !data.profile) {
                document.getElementById('profile-container').innerHTML = '<p>Profile not found.</p>';
                return;
            }
            const container = document.getElementById('profile-container');
            container.innerHTML = '';

            // Profile header
            const header = document.createElement('div');
            header.className = 'profile-header fade-in';
            header.innerHTML = `
                <img src="${data.profile.photo || 'images/default_profile.jpg'}" alt="${data.profile.name}" />
                <div class="name-quote">
                    <h2>${data.profile.name}</h2>
                    <blockquote>"${data.profile.quote || ''}"</blockquote>
                </div>
            `;
            container.appendChild(header);

            // Bio section
            const bioSection = document.createElement('section');
            bioSection.className = 'fade-in';
            bioSection.innerHTML = `
                <h3>Biography</h3>
                <p>${data.profile.bio || 'No biography available.'}</p>
            `;
            container.appendChild(bioSection);

            // Achievements section
            const achievementsSection = document.createElement('section');
            achievementsSection.className = 'fade-in';
            achievementsSection.innerHTML = '<h3>Achievements</h3>';
            const achList = document.createElement('ul');
            data.achievements.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                achList.appendChild(li);
            });
            achievementsSection.appendChild(achList);
            container.appendChild(achievementsSection);

            // Awards section
            const awardsSection = document.createElement('section');
            awardsSection.className = 'fade-in';
            awardsSection.innerHTML = '<h3>Awards</h3>';
            const awardsList = document.createElement('div');
            awardsList.className = 'awards-list';
            data.awards.forEach(item => {
                const span = document.createElement('span');
                span.className = 'award-tag';
                span.textContent = item;
                awardsList.appendChild(span);
            });
            awardsSection.appendChild(awardsList);
            container.appendChild(awardsSection);

            // Contributions section
            const contributionsSection = document.createElement('section');
            contributionsSection.className = 'fade-in contributions-list';
            contributionsSection.innerHTML = '<h3>Contributions</h3>';
            data.contributions.forEach(item => {
                const p = document.createElement('p');
                p.textContent = item;
                contributionsSection.appendChild(p);
            });
            container.appendChild(contributionsSection);

            // Gallery section
            const gallerySection = document.createElement('section');
            gallerySection.className = 'fade-in';
            gallerySection.innerHTML = '<h3>Gallery</h3>';
            const galleryGrid = document.createElement('div');
            galleryGrid.className = 'gallery-grid';
            data.gallery.forEach(imgPath => {
                const img = document.createElement('img');
                img.src = imgPath;
                img.alt = 'Gallery image';
                img.className = 'gallery-img';
                galleryGrid.appendChild(img);
            });
            gallerySection.appendChild(galleryGrid);
            container.appendChild(gallerySection);

            // Setup fade-in on scroll
            setupScrollFadeIn();
            setupLightbox();
        })
        .catch(error => {
            document.getElementById('profile-container').innerHTML = '<p>Error loading profile.</p>';
            console.error('Error fetching profile:', error);
        });
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

// Call fetchProfile on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProfile();
});
