// Homepage JavaScript with search and filter functionality

let scientistsData = [];
let filteredScientists = [];

// Fetch scientists data from API
function fetchScientists() {
    fetch('api/get_scientists.php')
        .then(response => response.json())
        .then(data => {
            scientistsData = data;
            populateFilterOptions();
            filteredScientists = scientistsData;
            renderScientists(filteredScientists);
            setupEventListeners();
        })
        .catch(error => {
            document.getElementById('scientist-cards').innerHTML = '<p>Error loading scientists data.</p>';
            console.error('Error fetching scientists:', error);
        });
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

// Render scientist cards based on filtered data
function renderScientists(scientists) {
    const container = document.getElementById('scientist-cards');
    container.innerHTML = '';

    if (!scientists || scientists.length === 0) {
        container.innerHTML = '<p>No scientists found.</p>';
        return;
    }

    scientists.forEach(scientist => {
        const card = document.createElement('div');
        card.className = 'scientist-card';

        card.innerHTML = `
            <img src="${scientist.profile_pic || 'images/default_profile.jpg'}" alt="${scientist.name}" class="profile-pic" />
            <h3>${scientist.name}</h3>
            <p><strong>Country:</strong> ${scientist.country || 'N/A'}</p>
            <p><strong>Organization:</strong> ${scientist.organization || 'N/A'}</p>
            <a href="profile.html?id=${scientist.id}" class="profile-link">View Profile</a>
        `;

        container.appendChild(card);
    });
}

// Setup event listeners for search input, filter select, and clear button
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');
    const clearBtn = document.getElementById('clear-filters');

    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterSelect.value = '';
        filteredScientists = scientistsData;
        renderScientists(filteredScientists);
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

    renderScientists(filteredScientists);
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchScientists();
});
