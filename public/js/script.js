//  pulsating animation
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');

    function triggerPulsate() {
        // Get a random index and check if it's hovered
        const randomIndex = Math.floor(Math.random() * skillCards.length);
        const selectedCard = skillCards[randomIndex];

        // Only add the pulsating class if it's not already present and not hovered
        if (!selectedCard.classList.contains('pulsating') && !selectedCard.matches(':hover')) {
            selectedCard.classList.add('pulsating');

            // Remove the class after the pulsating duration
            setTimeout(() => {
                selectedCard.classList.remove('pulsating');
            }, 3000); // Match duration to pulsating animation duration
        }
    }

    // Trigger the pulsate effect every 0.5 seconds
    setInterval(triggerPulsate, 500);

    // Cancel the pulsating animation on hover
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.remove('pulsating'); // Remove pulsating class on hover
        });
    });
});

//  clock
function updateClock() {
    const now = new Date();
    
    // Get current date details
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    // Get current time details
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clock = `${hours}:${minutes}:${seconds}`;
    
    // Update the HTML
    document.getElementById('date').textContent = dateString;
    document.getElementById('digital-clock').textContent = clock;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);