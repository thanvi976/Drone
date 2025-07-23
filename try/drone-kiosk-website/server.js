const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Load OTPs from JSON file
let otps = [];
try {
    const data = fs.readFileSync(path.join(__dirname, 'otps.json'), 'utf8');
    otps = JSON.parse(data);
} catch (err) {
    console.error('Error loading OTPs:', err);
    // Default OTPs if file doesn't exist
    otps = ['123456', '654321', '111222', '999888'];
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/validate-otp', (req, res) => {
    const { otp } = req.body;
    
    if (!otp) {
        return res.status(400).json({ success: false, message: 'OTP is required' });
    }
    
    // Check if OTP exists in our list
    const isValid = otps.includes(otp);
    
    if (isValid) {
        // In a real app, you'd remove the OTP after use
        // otps = otps.filter(o => o !== otp);
        // fs.writeFileSync(path.join(__dirname, 'otps.json'), JSON.stringify(otps));
        
        return res.json({ success: true });
    } else {
        return res.json({ success: false });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});