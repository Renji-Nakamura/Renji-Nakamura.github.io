const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000 };

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(index, total) {
        // 3D spiral configuration
        // We create multiple arms for a galaxy/spiral look. Let's do 3 arms.
        const arms = 3;
        const armIndex = index % arms;
        const t = Math.floor(index / arms) / (total / arms); // 0 to 1 along the arm

        // Angle increases as t goes from 0 to 1
        const angle = t * Math.PI * 10 + (armIndex * ((Math.PI * 2) / arms));

        // Radius stays relatively constant for a cylinder shape, 
        // with slight variation for thickness/texture
        const r = 350 + (Math.random() * 150 - 75);

        // Y position to span the entire screen height (and beyond for perspective)
        // Start much higher (negative Y goes up) and extend down
        const y = -1200 + t * 2000;

        this.x3d = r * Math.cos(angle);
        this.y3d = y;
        this.z3d = r * Math.sin(angle);

        // Add randomness for a dusty/particle feel
        const spread = 20 + t * 40; // less spread at center, more at edges
        this.x3d += (Math.random() - 0.5) * spread;
        this.y3d += (Math.random() - 0.5) * spread;
        this.z3d += (Math.random() - 0.5) * spread;

        // Base color: Purple #7b39fc -> rgba(123, 57, 252)
        // Add variations so it looks richer
        const colorMix = Math.random();
        if (colorMix > 0.8) {
            this.baseColor = { r: 162, g: 110, b: 255 }; // Light purple
        } else if (colorMix > 0.4) {
            this.baseColor = { r: 100, g: 30, b: 230 }; // Darker purple
        } else {
            this.baseColor = { r: 123, g: 57, b: 252 }; // Main purple
        }

        // Hover effect color: bright cyan / teal
        this.hoverColor = { r: 0, g: 255, b: 213 };

        this.radius = 1.0 + Math.random() * 2.0; // Random dot sizes
    }

    update(angleOffset, time) {
        // 3D rotation around Y-axis
        const cosA = Math.cos(angleOffset);
        const sinA = Math.sin(angleOffset);

        // We add a slight wave based on time
        let animatedY = this.y3d + Math.sin(time + this.x3d * 0.01) * 20;

        let x = this.x3d * cosA - this.z3d * sinA;
        let z = this.z3d * cosA + this.x3d * sinA;
        let y = animatedY;

        // Tilt the spiral down a bit around X axis (so we see it from relatively above)
        const tilt = 0.4;
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        const tempY = y * cosT - z * sinT;
        const tempZ = z * cosT + y * sinT;
        y = tempY;
        z = tempZ;

        // Projection
        const fov = 600;
        const cameraZ = 800;
        const zPos = z + cameraZ;

        if (zPos < 10) return; // Behind camera

        const scale = fov / zPos;
        // Project to screen center
        const x2d = (x * scale) + width / 2;
        // Raise it visually so it covers the top of the screen
        const y2d = (y * scale) + height / 2 - 200;

        // Interactive mouse hover calculation
        const dx = x2d - mouse.x;
        const dy = y2d - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let currentR = this.baseColor.r;
        let currentG = this.baseColor.g;
        let currentB = this.baseColor.b;
        let currentRadius = this.radius * scale;

        const interactionDist = 120;
        if (dist < interactionDist) {
            // Smoothed falloff
            const effect = Math.pow(1 - (dist / interactionDist), 2);

            currentR = Math.floor(currentR + (this.hoverColor.r - currentR) * effect);
            currentG = Math.floor(currentG + (this.hoverColor.g - currentG) * effect);
            currentB = Math.floor(currentB + (this.hoverColor.b - currentB) * effect);

            // Make hovered dots larger/pop
            currentRadius += effect * 3;
        }

        // Depth fading (far particles become darker/transparent)
        const maxZ = cameraZ + 800;
        let alpha = 1 - (zPos / maxZ);
        alpha = Math.min(1, Math.max(0.05, alpha));

        ctx.beginPath();
        ctx.arc(x2d, y2d, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${currentR}, ${currentG}, ${currentB}, ${alpha})`;
        ctx.fill();
    }
}

function init() {
    particles = [];
    const total = 4500; // Number of dots
    for (let i = 0; i < total; i++) {
        particles.push(new Particle(i, total));
    }
}

let angleOffset = 0;
let time = 0;

function animate() {
    // Clear with a slight trailing fade effect for smoother feeling (optional)
    ctx.clearRect(0, 0, width, height);

    // Calculate Z for precise painter's algorithm sorting
    const tilt = 0.4;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const cosA = Math.cos(angleOffset);
    const sinA = Math.sin(angleOffset);

    particles.forEach(p => {
        let zRotY = p.z3d * cosA + p.x3d * sinA;
        let yRotY = p.y3d + Math.sin(time + p.x3d * 0.01) * 20;
        p.tempZ = zRotY * cosT + yRotY * sinT;
    });

    particles.sort((a, b) => b.tempZ - a.tempZ);

    particles.forEach(p => p.update(angleOffset, time));

    angleOffset -= 0.002; // Rotate
    time += 0.02; // Wave time

    requestAnimationFrame(animate);
}

// Mouse events listener
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
});

window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

init();
animate();

// --- PORTFOLIO UI LOGIC ---

// 1. Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.add('hidden'));

        // Add to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// 2. Project Data
const projects = [
    {
        id: 'project-1',
        title: 'Cafe Wagtailシステム',
        desc: 'プロジェクト演習において、私の所属するグループはCafe Wagtailの販売データ記録及びAIによる販売意思決定支援システムの提案を行いました。プロトタイプ作成を担当。',
        numFrames: 0 // Will auto-detect
    }
];

let currentProjectIndex = 0;
const previewImg = document.getElementById('project-preview-img');
const previewMask = document.querySelector('.preview-mask');
const projectTitle = document.getElementById('project-title');
const projectDesc = document.getElementById('project-desc');

// Global map to store the resolved extension for each frame
const frameExtensions = {};

// Function to auto-detect how many frames exist for a project and their extensions
async function detectFrames(projectId) {
    let count = 0;
    frameExtensions[projectId] = {}; // Initialize map for this project

    while (true) {
        let testNum = (count + 1).toString().padStart(2, '0');

        // Helper to perform the image load check
        const checkExt = async (ext) => {
            let testUrl = `works/${projectId}/${testNum}${ext}`;
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(ext);
                img.onerror = () => resolve(false);
                img.src = testUrl;
            });
        };

        // GitHub Pages is case-sensitive, so check lowercase then uppercase
        let foundExt = await checkExt('.png');
        if (!foundExt) {
            foundExt = await checkExt('.PNG');
        }

        if (foundExt) {
            count++;
            frameExtensions[projectId][count] = foundExt; // Save which extension worked
        } else {
            break; // Stop at first missing image
        }
    }
    return count; // Return 0 if no images exist at all
}

// Function to initialize the projects array by filtering out missing ones
async function initProjects() {
    projectTitle.textContent = "Loading Projects...";
    projectDesc.textContent = "Please wait while we scan the directories.";

    const validProjects = [];

    for (let i = 0; i < projects.length; i++) {
        const count = await detectFrames(projects[i].id);
        if (count > 0) {
            projects[i].numFrames = count;
            validProjects.push(projects[i]);
        }
    }

    // Replace the global projects array with only valid ones
    projects.length = 0;
    projects.push(...validProjects);

    if (projects.length > 0) {
        currentProjectIndex = 0;
        loadProject(currentProjectIndex);
    } else {
        projectTitle.textContent = "No Projects Found";
        projectDesc.textContent = "Please ensure at least one project uses works/project-*/01.png";
    }
}

// Function to load project metadata and initial frame
function loadProject(index) {
    if (projects.length === 0) return;

    const proj = projects[index];
    projectTitle.textContent = proj.title;
    projectDesc.textContent = proj.desc;

    // Reset and start auto-looping for the new project
    resetAndStartLoop();
}

// Function to calculate and load a specific frame with a crossfade
function updatePreviewFrame(projectId, frameNumber) {
    const paddedNum = frameNumber.toString().padStart(2, '0');
    // Look up the correct extension (.png or .PNG) detected during init
    const ext = (frameExtensions[projectId] && frameExtensions[projectId][frameNumber]) || '.png';
    const newSrc = `works/${projectId}/${paddedNum}${ext}`;

    // Create new image element
    const newImg = document.createElement('img');
    newImg.src = newSrc;
    newImg.alt = "Project Preview";

    // Once loaded, append, animate to active, and clean up old images
    newImg.onload = () => {
        previewMask.appendChild(newImg);

        // Force reflow to ensure the initial state (opacity 0) is applied before active class
        void newImg.offsetWidth;

        newImg.classList.add('active');

        // Find existing images and queue them for removal
        const oldImages = previewMask.querySelectorAll('img:not(.active)');
        oldImages.forEach(img => {
            img.classList.remove('active'); // Start fade out
            setTimeout(() => {
                if (img.parentNode) {
                    img.parentNode.removeChild(img);
                }
            }, 1000); // Wait for CSS transition (0.8s opacity) to finish
        });

        // Also cleanup multiple active images if user clicks quickly before transition ends
        const allActive = previewMask.querySelectorAll('img.active');
        if (allActive.length > 1) {
            for (let i = 0; i < allActive.length - 1; i++) {
                allActive[i].classList.remove('active');
                setTimeout(() => {
                    if (allActive[i] && allActive[i].parentNode) {
                        allActive[i].parentNode.removeChild(allActive[i]);
                    }
                }, 1000);
            }
        }
    };
}

// 3. Automated Looping Logic

let loopInterval;
let currentFrameNumber = 1;
const FRAME_DURATION = 2000; // ms per frame

function startAutoLoop() {
    stopAutoLoop(); // Ensure no duplicates

    const proj = projects[currentProjectIndex];
    if (!proj || proj.numFrames <= 1) {
        return;
    }

    loopInterval = setInterval(() => {
        // Increment frame, loop back to 1
        currentFrameNumber++;
        if (currentFrameNumber > proj.numFrames) {
            currentFrameNumber = 1;
        }

        // Update image
        updatePreviewFrame(proj.id, currentFrameNumber);

    }, FRAME_DURATION);
}

function stopAutoLoop() {
    if (loopInterval) {
        clearInterval(loopInterval);
        loopInterval = null;
    }
}

// Reset loop system when jumping to new project
function resetAndStartLoop() {
    currentFrameNumber = 1;

    // Safety check just in case
    const proj = projects[currentProjectIndex];
    if (proj && proj.numFrames > 0) {
        updatePreviewFrame(proj.id, 1);
    }

    startAutoLoop();
}

// Start/Stop loop based on visibility (tab switching)
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        if (targetId === 'works-section') {
            startAutoLoop();
        } else {
            stopAutoLoop();
        }
    });
});

// 4. Project Navigation
const btnPrev = document.querySelector('.prev-project');
const btnNext = document.querySelector('.next-project');

if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        loadProject(currentProjectIndex);
    });

    btnNext.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        loadProject(currentProjectIndex);
    });
}

// Initialize projects and first project
initProjects();

