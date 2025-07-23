document.addEventListener('DOMContentLoaded', function() {
    const otpForm = document.getElementById('otp-form');
    const otpInput = document.getElementById('otp-input');
    const kioskScreen = document.getElementById('kiosk-screen');
    const kioskGlass = document.getElementById('kiosk-glass');

    otpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const otp = otpInput.value.trim();
        
        if (!otp) {
            showMessage('Please enter an OTP', 'error');
            return;
        }

        // Send OTP to backend for validation
        validateOTP(otp);
    });

    function validateOTP(otp) {
        fetch('/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp: otp })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Glass opening... Please collect your package', 'success');
                openKioskGlass();
            } else {
                showMessage('Invalid OTP. Try again', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again', 'error');
        });
    }

    function showMessage(message, type) {
        kioskScreen.innerHTML = `<p class="message ${type}">${message}</p>`;
        
        if (type === 'error') {
            // Add back the form after 2 seconds
            setTimeout(() => {
                kioskScreen.innerHTML = `
                    <p>Please enter your one-time passcode to retrieve your package</p>
                    <form id="otp-form">
                        <input type="text" id="otp-input" placeholder="Enter OTP" maxlength="6" required>
                        <button type="submit" class="btn">Submit</button>
                    </form>
                `;
                // Reattach event listener
                document.getElementById('otp-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    validateOTP(document.getElementById('otp-input').value.trim());
                });
            }, 2000);
        }
    }

    function openKioskGlass() {
        kioskGlass.classList.add('glass-opening');
        
        // Reset after 5 seconds
        setTimeout(() => {
            kioskGlass.classList.remove('glass-opening');
            kioskGlass.style.height = '100%';
            
            // Reset the screen
            kioskScreen.innerHTML = `
                <p>Thank you for using SkyDrop!</p>
                <p>Your package has been retrieved.</p>
                <p>Would you like to retrieve another package?</p>
                <button onclick="window.location.reload()" class="btn">Start Over</button>
            `;
        }, 5000);
    }
});