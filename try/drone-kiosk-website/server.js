const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Fixed port

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

    const isValid = otps.includes(otp);

    if (isValid) {
        console.log('🔓 Glass door opened'); // Log when OTP is valid

        // Optional: remove used OTP
        // otps = otps.filter(o => o !== otp);
        // fs.writeFileSync(path.join(__dirname, 'otps.json'), JSON.stringify(otps));

        return res.json({ success: true });
    } else {
        return res.json({ success: false });
    }
});

// Listen on all interfaces so others on the network can connect
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
    console.log(`🌐 Access this server from other devices using: http://10.174.67.1:${PORT}`);
});
