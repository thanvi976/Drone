document.addEventListener('DOMContentLoaded', function() {
    createFloatingEmojis();
});

function createFloatingEmojis() {
    const emojis = ['🍕', '🍔', '🍟', '☕', '📦', '🎁', '🍎', '🍪'];
    const container = document.querySelector('.floating-emojis');
    
    // Clear any existing emojis
    container.innerHTML = '';
    
    // Create 15 floating emojis
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation duration and delay
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;
        
        // Apply styles
        emoji.style.left = `${posX}vw`;
        emoji.style.top = `${posY}vh`;
        emoji.style.animationDuration = `${duration}s`;
        emoji.style.animationDelay = `${delay}s`;
        
        // Random size
        const size = 20 + Math.random() * 20;
        emoji.style.fontSize = `${size}px`;
        
        container.appendChild(emoji);
    }
}