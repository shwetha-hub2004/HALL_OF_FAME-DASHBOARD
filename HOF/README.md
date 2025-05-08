# Hall of Fame Dashboard Deployment Guide

This guide helps you deploy the Hall of Fame Dashboard for the Space Fraternity on a free PHP + MySQL hosting provider.

## Steps to Deploy

1. **Choose a Free Hosting Provider**
   - Examples: [000webhost](https://www.000webhost.com/), [InfinityFree](https://infinityfree.net/), [AwardSpace](https://www.awardspace.com/)
   - Sign up and create a free hosting account.

2. **Upload Project Files**
   - Use the hosting provider's File Manager or an FTP client (e.g., FileZilla).
   - Upload all project files and folders (`index.html`, `css/`, `js/`, `api/`, `images/`, `sql/`, etc.) to the `public_html` or `www` directory.

3. **Set Up MySQL Database**
   - In the hosting control panel, create a new MySQL database and user.
   - Assign the user to the database with all privileges.
   - Note the database name, username, password, and host (usually `localhost`).

4. **Import Database Schema**
   - Access phpMyAdmin from the hosting control panel.
   - Select your new database.
   - Use the Import tab to upload and import the `sql/database.sql` file.

5. **Update Database Connection**
   - Edit `api/db.php` to update the database connection credentials:
     ```php
     $host = 'your_host'; // usually 'localhost'
     $db_name = 'your_database_name';
     $username = 'your_database_user';
     $password = 'your_database_password';
     ```
   - Save and upload the updated `db.php`.

6. **Fix CORS Issues**
   - If you face CORS errors, add the following headers at the top of your PHP API files (e.g., `api/db.php` or each API file):
     ```php
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
     header("Access-Control-Allow-Headers: Content-Type");
     ```
   - Alternatively, use the provided `.htaccess` file if your host supports it.

7. **Test Your Site**
   - Visit your hosted domain.
   - Navigate through pages and verify dynamic content loads correctly.
   - Use browser developer tools to debug any issues.

## Additional Tips

- Ensure PHP version compatibility.
- Keep your database credentials secure.
- Consider upgrading to paid hosting for better performance and features.

---

Thank you for using the Hall of Fame Dashboard!
