// ISRO page specific JavaScript

// Fetch ISRO scientists and display
function fetchScientists(org = 'ISRO') {
    fetch('api/get_scientists.php?org=' + encodeURIComponent(org))
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            if (!Array.isArray(data) || data.length === 0) {
                contentDiv.innerHTML = '<p>No scientists found.</p>';
                return;
            }
            let html = '<ul>';
            data.forEach(scientist => {
                html += `<li><a href="profile.html?id=${scientist.id}">${scientist.name}</a></li>`;
            });
            html += '</ul>';
            contentDiv.innerHTML = html;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<p>Error loading scientists.</p>';
            console.error('Error fetching scientists:', error);
        });
}

// Call fetchScientists on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchScientists();
});
