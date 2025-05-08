// JavaScript for favorites.html to display favorite scientists

document.addEventListener('DOMContentLoaded', () => {
    fetchScientists();
});

function fetchScientists() {
    showLoadingSpinner(true);
    fetch('api/get_scientists.php')
        .then(response => response.json())
        .then(data => {
            renderFavoriteScientists(data);
            showLoadingSpinner(false);
        })
        .catch(error => {
            document.getElementById('favorite-cards').innerHTML = '<p>Error loading scientists data.</p>';
            console.error('Error fetching scientists:', error);
            showLoadingSpinner(false);
        });
}

function showLoadingSpinner(show) {
    // You can implement a spinner if needed, or leave empty
}

function getFavorites() {
    const favs = localStorage.getItem('favoriteScientists');
    return favs ? JSON.parse(favs) : [];
}

function renderFavoriteScientists(scientists) {
    const favoriteIds = getFavorites();
    const favoriteScientists = scientists.filter(sci => favoriteIds.includes(sci.id));
    const container = document.getElementById('favorite-cards');
    const noFavMsg = document.getElementById('no-favorites-message');

    container.innerHTML = '';

    if (favoriteScientists.length === 0) {
        noFavMsg.style.display = 'block';
        return;
    } else {
        noFavMsg.style.display = 'none';
    }

    favoriteScientists.forEach(scientist => {
        const card = document.createElement('div');
        card.className = 'scientist-card';

        card.innerHTML = `
            <button class="favorite-btn favorited" aria-label="Favorite">&#9733;</button>
            <img src="${scientist.photo || 'images/default_profile.jpg'}" alt="${scientist.name}" class="profile-pic" />
            <h3>${scientist.name}</h3>
            <p><strong>Country:</strong> ${scientist.country || 'N/A'}</p>
            <p><strong>Organization:</strong> ${scientist.organization || 'N/A'}</p>
            <a href="profile_detail.html?id=${scientist.id}" class="profile-link">View Profile</a>
        `;

        // Favorite button toggle logic
        const favBtn = card.querySelector('.favorite-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(scientist.id, favBtn);
            // Remove card if unfavorited
            if (!favBtn.classList.contains('favorited')) {
                card.remove();
                if (container.children.length === 0) {
                    noFavMsg.style.display = 'block';
                }
            }
        });

        container.appendChild(card);
    });
}

// Toggle favorite function copied from profile_list.js
function toggleFavorite(id, button) {
    let favorites = getFavorites();
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
        button.classList.remove('favorited');
        button.innerHTML = '&#9734;';
    } else {
        favorites.push(id);
        button.classList.add('favorited');
        button.innerHTML = '&#9733;';
    }
    localStorage.setItem('favoriteScientists', JSON.stringify(favorites));
}
