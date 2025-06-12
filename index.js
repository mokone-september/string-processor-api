const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => res.send('API Ready'));

// Main endpoint
app.post('/process-string', (req, res) => {
  try {
    if (!req.body || typeof req.body.data !== 'string') {
      return res.status(400).json({ error: 'Send { "data": "string" }' });
    }
    
    const result = {
      original: req.body.data,
      word: req.body.data.split('').sort()
    };
    
    res.json(result);
    
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));