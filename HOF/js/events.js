// Events page specific JavaScript

let currentTab = 'competition';
let eventsData = [];
let currentPage = 1;
let itemsPerPage = 5;
let currentSort = '';

// Fetch events and initialize tabs
function fetchEvents() {
    fetch('api/get_events.php')
        .then(response => response.json())
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                document.getElementById('tab-content').innerHTML = '<p>No events found.</p>';
                return;
            }
            eventsData = data;
            renderTabs();
            renderEvents(currentTab);
            setupTabListeners();
            setupSortListener();
        })
        .catch(error => {
            document.getElementById('tab-content').innerHTML = '<p>Error loading events.</p>';
            console.error('Error fetching events:', error);
        });
}

// Render tab buttons active state
function renderTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
        if (btn.dataset.tab === currentTab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Render events for the selected tab/category and current page
function renderEvents(category) {
    const container = document.getElementById('tab-content');
    container.classList.add('fade-out');
    setTimeout(() => {
        container.innerHTML = '';
        const allEvents = eventsData[category] || [];
        const sortedEvents = applySortToEvents(allEvents);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageEvents = sortedEvents.slice(startIndex, endIndex);

        if (pageEvents.length === 0) {
            container.innerHTML = '<p>No events in this category.</p>';
        } else {
            pageEvents.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';

                card.innerHTML = `
                    <a href="event_detail.html?eventId=${encodeURIComponent(event.id)}" class="event-link" style="text-decoration: none; color: inherit;">
                        <img src="${event.image || 'images/default_event.jpg'}" alt="${event.title}" />
                        <div class="event-info">
                            <div class="event-title">${event.title}</div>
                            <div class="event-date">${event.date}</div>
                            <div class="event-description">${event.description}</div>
                        </div>
                    </a>
                `;
                container.appendChild(card);
            });
        }
        container.classList.remove('fade-out');
    }, 300);

    renderPagination();
}

// Setup tab button click listeners
function setupTabListeners() {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.tab !== currentTab) {
                currentTab = btn.dataset.tab;
                currentPage = 1;
                renderTabs();
                renderEvents(currentTab);
            }
        });
    });
}

// Setup sort select listener
function setupSortListener() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            currentPage = 1;
            renderEvents(currentTab);
        });
    }
}

// Apply sorting to events array
function applySortToEvents(events) {
    if (!currentSort) return events;

    const [key, order] = currentSort.split('-');

    return events.slice().sort((a, b) => {
        let valA = a[key] ? a[key].toLowerCase() : '';
        let valB = b[key] ? b[key].toLowerCase() : '';
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

// Render pagination buttons
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil((eventsData[currentTab] || []).length / itemsPerPage);
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
            renderEvents(currentTab);
        });
        paginationContainer.appendChild(btn);
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});

