const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// POST endpoint
app.post('/process-string', (req, res) => {
    try {
        if (!req.body || !req.body.data) {
            return res.status(400).json({ error: 'Missing "data" field in request body' });
        }
        const charArray = req.body.data.split('');
        const sortedArray = charArray.sort();
        res.json({ word: sortedArray });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server locally (for testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;