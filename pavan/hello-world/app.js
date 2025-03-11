const express = require('express');
const app = express();

// Define a port
const PORT = 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello Pavan!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

