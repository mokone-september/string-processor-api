const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Main processing endpoint
app.post('/process-string', (req, res) => {
  console.log('Received request:', req.body); // Log for debugging
  
  try {
    // Validate input
    if (!req.body || typeof req.body.data !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input - expected { "data": "string" }' 
      });
    }

    // Process string
    const charArray = req.body.data.split('');
    const sortedArray = charArray.sort();
    
    // Return response
    res.json({ 
      word: sortedArray,
      original: req.body.data // For debugging
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

module.exports = app;