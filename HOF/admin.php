<?php
session_start();
if (!isset($_SESSION['username']) || !isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header('Location: login.html');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Dashboard - Global Space Hall of Fame</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/login_signup.css" />
    <link rel="stylesheet" href="css/admin.css" />
</head>
<body>
    <header class="site-header">
        <h1 class="site-title">Admin Dashboard</h1>
        <nav class="navbar">
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>Add Scientist</h2>
            <form id="addScientistForm" enctype="multipart/form-data" method="POST" action="api/add_scientist.php">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label for="photo">Photo:</label>
                <input type="file" id="photo" name="photo" accept="image/*" required />

                <label for="bio">Bio:</label>
                <textarea id="bio" name="bio" required></textarea>

                <label for="quote">Quote:</label>
                <textarea id="quote" name="quote"></textarea>

                <label for="organization">Organization:</label>
                <input type="text" id="organization" name="organization" />

                <label for="country">Country:</label>
                <input type="text" id="country" name="country" />

                <button type="submit">Add Scientist</button>
            </form>
        </section>

        <section>
            <h2>Add Event</h2>
            <form id="addEventForm" enctype="multipart/form-data" method="POST" action="api/add_event.php">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required />

                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>

                <label for="date">Date:</label>
                <input type="date" id="date" name="date" required />

                <label for="image">Image:</label>
                <input type="file" id="image" name="image" accept="image/*" />

                <label for="category">Category:</label>
                <select id="category" name="category" required>
                    <option value="competition">Competition</option>
                    <option value="webinar">Webinar</option>
                    <option value="college_event">College Event</option>
                </select>

                <button type="submit">Add Event</button>
            </form>
        </section>

        <section>
            <h2>Upload Gallery Image</h2>
            <form id="uploadGalleryForm" enctype="multipart/form-data" method="POST" action="api/upload_gallery_image.php">
                <label for="scientist_id">Scientist ID:</label>
                <input type="number" id="scientist_id" name="scientist_id" required />

                <label for="gallery_image">Image:</label>
                <input type="file" id="gallery_image" name="gallery_image" accept="image/*" required />

                <button type="submit">Upload Image</button>
            </form>
        </section>
    <section>
        <h2>Existing Scientists</h2>
        <table id="scientistsTable" border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Bio</th>
                    <th>Quote</th>
                    <th>Organization</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Scientist rows will be populated by JavaScript -->
            </tbody>
        </table>
    </section>

    <section>
        <h2>Edit Scientist</h2>
        <form id="editScientistForm" enctype="multipart/form-data" method="POST" action="api/edit_scientist.php">
            <input type="hidden" id="edit_id" name="id" />
            <label for="edit_name">Name:</label>
            <input type="text" id="edit_name" name="name" required />

            <label for="edit_photo">Photo (leave blank to keep current):</label>
            <input type="file" id="edit_photo" name="photo" accept="image/*" />

            <label for="edit_bio">Bio:</label>
            <textarea id="edit_bio" name="bio" required></textarea>

            <label for="edit_quote">Quote:</label>
            <textarea id="edit_quote" name="quote"></textarea>

            <label for="edit_organization">Organization:</label>
            <input type="text" id="edit_organization" name="organization" />

            <label for="edit_country">Country:</label>
            <input type="text" id="edit_country" name="country" />

            <button type="submit">Update Scientist</button>
        </form>
    </section>

    <script>
        async function fetchScientists() {
            const response = await fetch('api/get_scientists.php');
            const data = await response.json();
            const tbody = document.querySelector('#scientistsTable tbody');
            tbody.innerHTML = '';
            data.forEach(scientist => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${scientist.id}</td>
                    <td>${scientist.name}</td>
                    <td><img src="images/${scientist.photo}" alt="${scientist.name}" width="50" /></td>
                    <td>${scientist.bio}</td>
                    <td>${scientist.quote || ''}</td>
                    <td>${scientist.organization || ''}</td>
                    <td>${scientist.country || ''}</td>
                    <td><button onclick="editScientist(${scientist.id})">Edit</button></td>
                `;
                tbody.appendChild(tr);
            });
        }

        async function editScientist(id) {
            const response = await fetch('api/get_scientist_detail.php?id=' + id);
            const scientist = await response.json();
            document.getElementById('edit_id').value = scientist.id;
            document.getElementById('edit_name').value = scientist.name;
            document.getElementById('edit_bio').value = scientist.bio;
            document.getElementById('edit_quote').value = scientist.quote || '';
            document.getElementById('edit_organization').value = scientist.organization || '';
            document.getElementById('edit_country').value = scientist.country || '';
            // Clear photo input
            document.getElementById('edit_photo').value = '';
            window.scrollTo(0, document.body.scrollHeight);
        }

        const editForm = document.getElementById('editScientistForm');
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(editForm);
            const response = await fetch('api/edit_scientist.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                alert(result.success);
                fetchScientists();
                editForm.reset();
            } else {
                alert('Error: ' + result.error);
            }
        });

        // Initial fetch of scientists
        fetchScientists();
    </script>
