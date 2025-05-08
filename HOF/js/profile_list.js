// JavaScript for profile.html to display all profiles with search and filter functionality

var scientistsData = [];
var filteredScientists = [];
var currentPage = 1;
var itemsPerPage = 5;
var currentSort = '';

// Fetch scientists data from API
function fetchScientists() {
    showLoadingSpinner(true);
    fetch('api/get_scientists.php')
        .then(response => response.json())
        .then(data => {
            scientistsData = data;
            populateFilterOptions();
            filteredScientists = scientistsData;
            renderScientistsPage(currentPage);
            setupEventListeners();
            showLoadingSpinner(false);
        })
        .catch(error => {
            document.getElementById('scientist-cards').innerHTML = '<p>Error loading scientists data.</p>';
            console.error('Error fetching scientists:', error);
            showLoadingSpinner(false);
        });
}

// Show or hide loading spinner
function showLoadingSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = show ? 'block' : 'none';
}

// Populate filter dropdown with unique countries/organizations
function populateFilterOptions() {
    const filterSelect = document.getElementById('filter-select');
    const optionsSet = new Set();

    scientistsData.forEach(scientist => {
        if (scientist.country) {
            optionsSet.add(scientist.country);
        }
        if (scientist.organization) {
            optionsSet.add(scientist.organization);
        }
    });

    // Clear existing options except default
    filterSelect.innerHTML = '<option value="">Filter by Country/Organization</option>';

    Array.from(optionsSet).sort().forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        filterSelect.appendChild(opt);
    });
}

// Render scientist cards for the current page
function renderScientistsPage(page) {
    const container = document.getElementById('scientist-cards');
    container.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredScientists.slice(startIndex, endIndex);

    if (!pageItems || pageItems.length === 0) {
        container.innerHTML = '<p>No scientists found.</p>';
        return;
    }

    pageItems.forEach(scientist => {
        const card = document.createElement('div');
        card.className = 'scientist-card';

        card.innerHTML = `
            <button class="favorite-btn" aria-label="Favorite">&#9734;</button>
            <img src="${scientist.photo || 'images/default_profile.jpg'}" alt="${scientist.name}" class="profile-pic" />
            <h3>${scientist.name}</h3>
            <p><strong>Country:</strong> ${scientist.country || 'N/A'}</p>
            <p><strong>Organization:</strong> ${scientist.organization || 'N/A'}</p>
            <a href="profile_detail.html?id=${scientist.id}" class="profile-link">View Profile</a>
        `;

        // Add event listener for quick preview modal on card click (excluding favorite button and profile link)
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-btn') || e.target.classList.contains('profile-link')) {
                return;
            }
            openQuickPreview(scientist);
        });

        // Favorite button logic
        const favBtn = card.querySelector('.favorite-btn');
        const favorites = getFavorites();
        if (favorites.includes(scientist.id)) {
            favBtn.classList.add('favorited');
            favBtn.innerHTML = '&#9733;';
        }
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(scientist.id, favBtn);
        });

        container.appendChild(card);
    });

    renderPagination();
}

// Render pagination buttons
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredScientists.length / itemsPerPage);
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
            renderScientistsPage(currentPage);
        });
        paginationContainer.appendChild(btn);
    }
}

// Setup event listeners for search input, filter select, sort select, clear button, and quick preview modal close
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');
    const sortSelect = document.getElementById('sort-select');
    const clearBtn = document.getElementById('clear-filters');
    const quickPreviewModal = document.getElementById('quick-preview-modal');
    const closeBtn = quickPreviewModal.querySelector('.close-btn');

    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applySort);
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterSelect.value = '';
        sortSelect.value = '';
        filteredScientists = scientistsData;
        currentSort = '';
        currentPage = 1;
        renderScientistsPage(currentPage);
    });

    closeBtn.addEventListener('click', () => {
        quickPreviewModal.style.display = 'none';
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === quickPreviewModal) {
            quickPreviewModal.style.display = 'none';
        }
    });
}

// Apply search and filter to scientists data
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filterValue = document.getElementById('filter-select').value;

    filteredScientists = scientistsData.filter(scientist => {
        const matchesName = scientist.name.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === '' || scientist.country === filterValue || scientist.organization === filterValue;
        return matchesName && matchesFilter;
    });

    currentPage = 1;
    applySort();
}

// Apply sorting to filtered scientists
function applySort() {
    const sortValue = document.getElementById('sort-select').value;
    currentSort = sortValue;

    if (!sortValue) {
        renderScientistsPage(currentPage);
        return;
    }

    const [key, order] = sortValue.split('-');

    filteredScientists.sort((a, b) => {
        let valA = a[key] ? a[key].toLowerCase() : '';
        let valB = b[key] ? b[key].toLowerCase() : '';
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });

    renderScientistsPage(currentPage);
}

// Quick preview modal open function
function openQuickPreview(scientist) {
    const modal = document.getElementById('quick-preview-modal');
    modal.style.display = 'block';
    document.getElementById('preview-img').src = scientist.photo || 'images/default_profile.jpg';
    document.getElementById('preview-name').textContent = scientist.name;
    document.getElementById('preview-country').textContent = 'Country: ' + (scientist.country || 'N/A');
    document.getElementById('preview-organization').textContent = 'Organization: ' + (scientist.organization || 'N/A');
    document.getElementById('preview-profile-link').href = 'profile_detail.html?id=' + scientist.id;
}

// Favorite button toggle logic with localStorage
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

// Get favorites from localStorage
function getFavorites() {
    const favs = localStorage.getItem('favoriteScientists');
    return favs ? JSON.parse(favs) : [];
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchScientists();
});
