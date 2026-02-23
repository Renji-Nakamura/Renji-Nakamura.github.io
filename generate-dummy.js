const fs = require('fs');
const path = require('path');

const projects = ['project-1', 'project-2', 'project-3'];
const numImages = 15;

projects.forEach(project => {
    const dir = path.join(__dirname, 'works', project);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Generate dummy image urls (we'll just use placehold.co to create actual images and save them as files or just use text files)
    // Actually, setting up 45 images takes space. Let's just create placeholder files that the browser can load.
    // To make it easy, we will just use a generic SVG file for each image but with a different number to show the scrub effect.
    for (let i = 1; i <= numImages; i++) {
        const paddedNum = i.toString().padStart(2, '0');
        const fileName = `${paddedNum}.svg`;
        const filePath = path.join(dir, fileName);

        let color = '#3A1C71';
        if (project === 'project-2') color = '#D76D77';
        if (project === 'project-3') color = '#FFAF7B';

        // Basic SVG with a number
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
            <rect width="100%" height="100%" fill="${color}" />
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="120" fill="white">
                ${project.toUpperCase()} - ${paddedNum}
            </text>
        </svg>`;

        fs.writeFileSync(filePath, svgContent);
    }
    console.log(`Created ${numImages} images for ${project}`);
});
