const sharp = require('sharp');
const path = require('path');

// Create a 128x128 icon for VS Code extension
async function createIcon() {
    const size = 128;
    
    // Create SVG with a gradient and sparkle icon
    const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" rx="24" fill="url(#bg)"/>
        <!-- Git branch icon simplified -->
        <circle cx="40" cy="45" r="8" fill="none" stroke="white" stroke-width="4"/>
        <circle cx="88" cy="45" r="8" fill="none" stroke="white" stroke-width="4"/>
        <circle cx="64" cy="85" r="8" fill="none" stroke="white" stroke-width="4"/>
        <line x1="40" y1="53" x2="40" y2="70" stroke="white" stroke-width="4"/>
        <line x1="40" y1="70" x2="64" y2="77" stroke="white" stroke-width="4"/>
        <line x1="88" y1="53" x2="88" y2="70" stroke="white" stroke-width="4"/>
        <line x1="88" y1="70" x2="64" y2="77" stroke="white" stroke-width="4"/>
        <!-- Sparkle -->
        <text x="90" y="35" font-size="24" fill="#fbbf24">✨</text>
    </svg>`;

    await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(__dirname, 'icon.png'));

    console.log('Created icon.png (128x128)');
}

createIcon().catch(console.error);
