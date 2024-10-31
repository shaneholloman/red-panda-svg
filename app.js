document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('svg');
    svg.style.transition = 'opacity 4s ease-in-out';
    svg.style.opacity = '1';
    
    const paths = svg.querySelectorAll('path');
    document.body.style.backgroundColor = paths[0].getAttribute('fill') || '#F7F7F7';

    const ANIMATION_DELAY = 50;
    paths.forEach((path, index) => {
        path.style.opacity = '0';
        path.style.transition = 'opacity 0.5s ease-in, fill 0.5s';
        setTimeout(() => {
            path.style.opacity = '1';
        }, index * ANIMATION_DELAY);
    });
});