// Import the Express module
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory users data (simulating a database)
const users = [
  { id: 1, name: "Alice", age: 12 },
  { id: 2, name: "John", age: 12 },
  { id: 3, name: "Robert", age: 12 },
];

// Route: GET /
// Purpose: Test endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Route: GET /api/users
// Purpose: Get all users
app.get('/api/users', (req, res) => {
  res.send(users);
});

// Route: GET /api/users/:id
// Purpose: Get a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with the given ID not found.');
  res.send(user);
});

// Route: POST /api/users
// Purpose: Create a new user
app.post('/api/users', (req, res) => {
  const { name, age } = req.body;

  // Basic validation
  if (!name || name.length < 3) {
    return res.status(400).send('Name is required and should be at least 3 characters.');
  }

  // Generate new user ID
  const user = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    age: age || null, // default null if age not provided
  };

  users.push(user);
  res.send(user);
});

// Route: PUT /api/users/:id
// Purpose: Update an existing user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User with the given ID not found.');

  const { name, age } = req.body;

  // Basic validation
  if (!name || name.length < 3) {
    return res.status(400).send('Name is required and should be at least 3 characters.');
  }

  // Update user data
  user.name = name;
  if (age !== undefined) user.age = age;

  res.send(user);
});

// Route: DELETE /api/users/:id
// Purpose: Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User with the given ID not found.');

  const deletedUser = users.splice(userIndex, 1)[0]; // Remove user from array
  res.send(deletedUser);
});

// Set port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
