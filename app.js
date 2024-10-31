document.addEventListener('DOMContentLoaded', () => {
    // Get the SVG element
    const svg = document.querySelector('svg');
    
    // Create a Set to store unique fill colors
    const uniqueFillColors = new Set();
    
    // Get all path elements within the SVG
    const paths = svg.querySelectorAll('path');
    
    // Initial color collection
    for (let i = 0; i < paths.length; i++) {
        const fillColor = paths[i].getAttribute('fill');
        if (fillColor) {
            uniqueFillColors.add(fillColor);
        }
    }

    // Convert colors to HSL format
    let colorMap = new Map();
    uniqueFillColors.forEach(color => {
        // Create a temporary div to use getComputedStyle
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        const rgbColor = getComputedStyle(temp).color;
        document.body.removeChild(temp);
        
        // Parse RGB values
        const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
        
        // Convert to HSL
        const hsl = rgbToHsl(r, g, b);
        colorMap.set(color, hsl);
    });

    // Set initial background color
    const firstPathColor = paths[0].getAttribute('fill');
    if (firstPathColor && colorMap.has(firstPathColor)) {
        const [h, s, l] = colorMap.get(firstPathColor);
        document.body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    }

    // Set up initial styles and animations for paths
    paths.forEach((path, index) => {
        path.style.opacity = '0';
        path.style.transition = 'opacity 1s ease-in, fill 0.5s';
        setTimeout(() => {
            path.style.opacity = '1';
        }, index * 100); // delay between each path
    });

    // Animation loop for color changes
    let hueShift = 0;
    const UPDATE_INTERVAL = 200; // milliseconds
    setInterval(() => {
        hueShift = (hueShift + 10) % 360; // Increment hue by 10 degrees each interval
        
        for (let i = 0; i < paths.length; i++) {
            const originalColor = paths[i].getAttribute('fill');
            if (originalColor && colorMap.has(originalColor)) {
                const [h, s, l] = colorMap.get(originalColor);
                const newHue = (h + hueShift) % 360;
                paths[i].style.fill = `hsl(${newHue}, ${s}%, ${l}%)`;

                // Update background color to match first path
                if (i === 0) {
                    document.body.style.transition = 'background-color 0.5s';
                    document.body.style.backgroundColor = `hsl(${newHue}, ${s}%, ${l}%)`;
                }
            }
        }
    }, UPDATE_INTERVAL);
});

// Helper function to convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
} 