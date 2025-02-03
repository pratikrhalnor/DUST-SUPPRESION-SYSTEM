// Initialize the fogger and dust level readings
let foggerStatus = false;
let dustLevel = 0;
let foggerRuntime = 0;
let foggerInterval;
let dustLevelInterval;

// Update the fogger status and display
function updateFoggerStatus() {
    const foggerStatusElement = document.getElementById('foggerStatus');
    if (foggerStatus) {
        foggerStatusElement.textContent = 'ON';
        // Start the fogger runtime
        if (!foggerInterval) {
            foggerInterval = setInterval(() => {
                foggerRuntime++;
                document.getElementById('runtime').textContent = foggerRuntime;
            }, 1000); // Update every second
        }
    } else {
        foggerStatusElement.textContent = 'OFF';
        // Stop the fogger runtime
        clearInterval(foggerInterval);
        foggerInterval = null;
    }
}

// Update the dust level readings
function updateDustLevel() {
    dustLevel = Math.floor(Math.random() * 100); // Simulating dust level readings between 0 and 100
    document.getElementById('dustLevel').textContent = dustLevel;
}

// Start the dust sensor updates every 5 seconds
dustLevelInterval = setInterval(updateDustLevel, 5000);

// Set up the fogger toggle switch
document.getElementById('foggerToggle').addEventListener('change', (event) => {
    foggerStatus = event.target.checked; // Set the fogger status based on switch position
    updateFoggerStatus(); // Update the fogger status display
});

// Logout function
document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear session or local storage data if needed
    localStorage.removeItem('token');
    
    // Redirect to the login page
    window.location.href = 'login.html';
});

// On page load, update the fogger status and dust level
updateFoggerStatus();
updateDustLevel();
