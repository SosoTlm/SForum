const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = require('./users.json');

// Function to save users to file
function saveUsers() {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Route for login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).send('User not found');
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            if (user.isAdmin) {
                res.redirect('/admin');
            } else {
                res.send('Login successful!');
            }
        } else {
            res.status(400).send('Invalid password');
        }
    });
});

// Route for registering users
app.post('/register', async (req, res) => {
    const { email, password, username } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, username, password: hashedPassword, isAdmin: false };
    users.push(newUser);
    saveUsers();
    res.send('User registered successfully!');
});

// Route to access admin panel
app.post('/admin-login', (req, res) => {
    const { password } = req.body;

    if (password === 'imbos23') {
        res.redirect('/admin');
    } else {
        res.status(403).send('Incorrect password');
    }
});

// Admin actions
let bannedUsers = [];
let bannedForums = [];
let serversBlocked = false;

// Ban a user
app.post('/ban-user', (req, res) => {
    const { username } = req.body;
    bannedUsers.push(username);
    res.send(`${username} has been banned`);
});

// Ban a forum
app.post('/ban-forum', (req, res) => {
    const { forumName } = req.body;
    bannedForums.push(forumName);
    res.send(`Forum ${forumName} has been banned`);
});

// Block servers
app.post('/block-servers', (req, res) => {
    serversBlocked = true;
    res.send('Servers blocked until the issue is resolved');
});

// Admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
