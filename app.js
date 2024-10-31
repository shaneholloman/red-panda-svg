document.addEventListener('DOMContentLoaded', () => {
    // Get the SVG element
    const svg = document.querySelector('svg');
    
    // Create a Set to store unique fill colors
    const uniqueFillColors = new Set();
    
    // Get all path elements within the SVG
    const paths = svg.querySelectorAll('path');
    
    // Iterate through each path and collect fill colors
    for (let i = 0; i < paths.length; i++) {
        const fillColor = paths[i].getAttribute('fill');
        if (fillColor) {
            uniqueFillColors.add(fillColor);
        }
    }
    
    // Log the unique colors to the console
    console.log('Unique fill colors in SVG:', [...uniqueFillColors]);
}); 