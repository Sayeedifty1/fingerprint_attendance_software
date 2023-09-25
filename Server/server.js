const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'autus-auth',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Enable CORS for all routes
app.use(cors()); 
app.use(express.json());

// POST route to register a new user
// POST route to register a new user
app.post('/users', (req, res) => {
  const { name, email, category, password } = req.body;

  if (!name || !email || !category || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = { name, email, category, password };
console.log(user);
  // Insert the user data into the 'users' table
  db.query('INSERT INTO users SET ?', user, (err, results) => {
    if (err) {
      console.error('Error inserting user into MySQL:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    console.log('User registered successfully');
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// get user by email and password match
app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    // Query the database to find a user with the matching email and password
    db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
          // No user found with matching email and password
          return res.status(401).json({ error: 'Authentication failed' });
        }
  
        // User found; send the user data in the response
        const user = results[0];
        res.status(200).json(user);
      }
    );
  });

  // get all user 
  app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  });
  


    


// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Node.js server is running on port ${PORT}`);
});
