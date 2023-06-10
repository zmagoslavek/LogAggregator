const express = require('express');
const app = express();
const port = 3000; // You can change the port number to your preference

// Define your API routes and handlers
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/data', (req, res) => {
  // Handle the request and send a response
  const data = { message: 'This is your API data' };
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
