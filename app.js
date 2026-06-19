/**
 * Nexus Stream Ultra Pro - Master Framework Core Core Engine
 */

let visualizerInterval = null;
let currentEarningBalance = 0.00;
let totalMonetizedSeconds = 0;
let monetizationTimer = null;

// Space Canvas Matrix Engine Global Metrics
let canvas = null, ctx = null;
let stars = [];
let maxStars = 150;
let spaceSpeed = 0.4;
let audioCtx = null;
let ambientOsc = null;
let spaceAnimationId = null;

document.addEventListener("DOMContentLoaded", () => {
    startVisualizerLoop();
    startMonetizationBilling();
    initSpaceMatrixEngine();
});

// MULTI-SCREEN NAVIGATION APP ROUTER DECK CONTROL ENGINE
function switchTab(targetTabId) {
    // Clear display visibility across all core views
    document.querySelectorAll('.app-screen').forEach(screen => screen.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    // Enable visibility constraints for target component panels
    document.getElementById(`${targetTabId}Screen`).classList.add('active');
    document.getElementById(`tab-${targetTabId}`).classList.add('active');
    
    triggerNotification(`Switched screen module instance to: ${targetTabId.toUpperCase()}`);

    // Pause heavy global media rendering engines if space view is discarded
    if (targetTabId === 'space') {
        startSpaceLoopFrame();
    } else {
        if (spaceAnimationId) cancelAnimationFrame(spaceAnimationId);
    }

    // Toggle short playback instances matching viewport activity layouts
    const shortPlayer = document.querySelector('.short-video-player');
    if (targetTabId === 'shorts') {
        shortPlayer.play();
    } else {
        shortPlayer.pause();
    }
}

function triggerNotification(message, color = "#6366f1") {
    const toast = document.getElementById("toastContainer");
    if (!toast) return;
    toast.innerText = message;
    toast.style.borderLeftColor = color;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2000);
}

// REAL-TIME CREATOR WALLET MONETIZATION BILLING SIMULATOR NODES
function startMonetizationBilling() {
    const homePlayer = document.getElementById("mainVideoNode");
    const shortsPlayer = document.querySelector(".short-video-player");

    if (monetizationTimer) clearInterval(monetizationTimer);

    monetizationTimer = setInterval(() => {
        // Increment revenue balance if either player context is actively rendering audio/video output frames
        let isHomePlaying = (homePlayer && !homePlayer.paused && !homePlayer.ended);
        let isShortsPlaying = (shortsPlayer && !shortsPlayer.paused && !shortsPlayer.ended && document.getElementById("shortsScreen").classList.contains("active"));

        if (isHomePlaying || isShortsPlaying) {
            totalMonetizedSeconds += 1;
            // Accrue a CPM baseline rate reward balance slice per video run frame interval cycle
            currentEarningBalance += 0.02;

            // Paint metrics fields softly across active layer boards
            document.getElementById("headerBalance").innerText = `$${currentEarningBalance.toFixed(2)}`;
            document.getElementById("walletBalanceDisplay").innerText = `$${currentEarningBalance.toFixed(2)}`;
            document.getElementById("monetizedTimeDisplay").innerText = `${totalMonetizedSeconds}s`;
        }
    }, 1000);
}

function triggerCashout() {
    if (currentEarningBalance <= 0) {
        triggerNotification("Insufficient ledger revenue balance for cashout request.", "#dc2626");
        return;
    }
    triggerNotification(`Cashout success! Sent $${currentEarningBalance.toFixed(2)} to external accounts.`, "#16a34a");
    currentEarningBalance = 0.00;
    document.getElementById("headerBalance").innerText = `$0.00`;
    document.getElementById("walletBalanceDisplay").innerText = `$0.00`;
}

// CREATOR WORKSPACE METADATA DECODE HUB LOGIC
function executeStudioUpload() {
    const titleInput = document.getElementById("uploadTitleInput").value.trim();
    const fileSelector = document.getElementById("mobileVideoSelector");
    
    if (titleInput === "") {
        triggerNotification("Please enter a media track reference title code.", "#dc2626");
        return;
    }
    
    if (fileSelector.files.length === 0) {
        triggerNotification("Please attach an video asset structure block first.", "#dc2626");
        return;
    }

    // Capture file link source stream references and route variables directly straight to layout pipelines
    const file = fileSelector.files[0];
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");

    player.src = URL.createObjectURL(file);
    player.load();
    titleDisplay.innerText = titleInput;

    triggerNotification("Asset successfully ingested into Home Screen feed layer!", "#16a34a");
    switchTab('home');
    player.play();
}

function playSelectedVideo(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById("uploadTitleInput").value = file.name.replace(/\.[^/.]+$/, "");
        triggerNotification("Video file selected. Complete details in Create tab.");
        switchTab('studio');
    }
}

function loadPresetVideo(videoUrl, titleText) {
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");
    player.src = videoUrl;
    player.load();
    player.play();
    titleDisplay.innerText = titleText;
    triggerNotification("Streaming active remote source...");
}

// HARDWARE WEB AUDIO SYNTH OSCILLATOR SOUNDBOARD LOGIC MATRIX 
function playFX(type) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctxInstance = new AudioCtxClass();
    
    const oscNode = ctxInstance.createOscillator();
    const gainNode = ctxInstance.createGain();
    oscNode.connect(gainNode);
    gainNode.connect(ctxInstance.destination);

    const timeOffset = ctxInstance.currentTime;

    if (type === 'airhorn') {
        oscNode.type = 'sawtooth'; oscNode.frequency.setValueAtTime(390, timeOffset);
        gainNode.gain.setValueAtTime(0.15, timeOffset); gainNode.gain.exponentialRampToValueAtTime(0.01, timeOffset + 0.5);
        oscNode.start(timeOffset); oscNode.stop(timeOffset + 0.5);
    } else if (type === 'bass') {
        oscNode.type = 'triangle'; oscNode.frequency.setValueAtTime(90, timeOffset);
        oscNode.frequency.exponentialRampToValueAtTime(45, timeOffset + 0.7);
        gainNode.gain.setValueAtTime(0.35, timeOffset); gainNode.gain.exponentialRampToValueAtTime(0.01, timeOffset + 0.7);
        oscNode.start(timeOffset); oscNode.stop(timeOffset + 0.7);
    } else if (type === 'laser') {
        oscNode.type = 'sine'; oscNode.frequency.setValueAtTime(1100, timeOffset);
        oscNode.frequency.exponentialRampToValueAtTime(150, timeOffset + 0.25);
        gainNode.gain.setValueAtTime(0.15, timeOffset); gainNode.gain.exponentialRampToValueAtTime(0.01, timeOffset + 0.25);
        oscNode.start(timeOffset); oscNode.stop(timeOffset + 0.25);
    } else if (type === 'cheer') {
        oscNode.type = 'sine'; oscNode.frequency.setValueAtTime(250, timeOffset);
        gainNode.gain.setValueAtTime(0.1, timeOffset); gainNode.gain.linearRampToValueAtTime(0.18, timeOffset + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, timeOffset + 0.8);
        oscNode.start(timeOffset); oscNode.stop(timeOffset + 0.8);
    }
    triggerNotification(`Dispatched [${type.toUpperCase()}] overlay token to live output mix.`);
}

// PROCEDURAL DEEP SPACE CANVAS RENDERING VECTOR LOOPS SYSTEM
function initSpaceMatrixEngine() {
    canvas = document.getElementById("spaceCanvas");
    ctx = canvas.getContext("2d");
    
    window.addEventListener('resize', () => {
        if (canvas && document.getElementById("spaceScreen").classList.contains("active")) {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        }
    });
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

    for (let i = 0; i < maxStars; i++) {
        stars.push({
            x: Math.random() * canvas.width - canvas.width / 2,
            y: Math.random() * canvas.height - canvas.height / 2,
            z: Math.random() * canvas.width,
            color: ['#ffffff', '#818cf8', '#c084fc', '#f43f5e'][Math.floor(Math.random() * 4)]
        });
    }
}

function startSpaceLoopFrame() {
    if (spaceAnimationId) cancelAnimationFrame(spaceAnimationId);
    
    function renderFrame() {
        ctx.fillStyle = "rgba(3, 3, 3, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let cx = canvas.width / 2, cy = canvas.height / 2;

        for (let i = 0; i < maxStars; i++) {
            let star = stars[i];
            star.z -= spaceSpeed;
            if (star.z <= 0) {
                star.z = canvas.width;
                star.x = Math.random() * canvas.width - canvas.width / 2;
                star.y = Math.random() * canvas.height - canvas.height / 2;
            }
            let px = (star.x / star.z) * cx + cx;
            let py = (star.y / star.z) * cy + cy;
            let size = (1 - star.z / canvas.width) * 4;

            if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
                ctx.beginPath(); ctx.fillStyle = star.color;
                ctx.arc(px, py, Math.abs(size), 0, Math.PI * 2); ctx.fill();
            }
        }
        spaceAnimationId = requestAnimationFrame(renderFrame);
    }
    spaceAnimationId = requestAnimationFrame(renderFrame);
}

function warpSpeed() {
    spaceSpeed = spaceSpeed === 0.4 ? 14 : 0.4;
    triggerNotification(spaceSpeed > 1 ? "Hyper warp engine tracking locks active" : "Cruising speed structural bounds restored.");
}

function toggleSpaceAudio() {
    const btn = document.getElementById("audioToggleBtn");
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        ambientOsc = audioCtx.createOscillator();
        let gainNode = audioCtx.createGain();
        ambientOsc.type = 'sine'; ambientOsc.frequency.setValueAtTime(60, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        ambientOsc.connect(gainNode); gainNode.connect(audioCtx.destination);
        ambientOsc.start();
        btn.innerText = "🔈 SUSPEND SPACE AUDIO SYNTH";
    } else {
        if (audioCtx.state === 'running') { audioCtx.suspend(); btn.innerText = "⚡ ACTIVATE AUDIO SYNTH"; }
        else { audioCtx.resume(); btn.innerText = "🔈 SUSPEND SPACE AUDIO SYNTH"; }
    }
}

// BACKEND SIMULATED GRAPHIC AUDIO EQUALIZER STRIP COMPONENT PIPELINES
function startVisualizerLoop() {
    const player = document.getElementById("mainVideoNode");
    const bars = document.querySelectorAll(".eq-bar");

    setInterval(() => {
        if (player && !player.paused && !player.ended) {
            bars.forEach(bar => {
                bar.style.height = `${Math.floor(Math.random() * 14) + 2}px`;
            });
        } else {
            bars.forEach(bar => bar.style.height = "2px");
        }
    }, 100);
}

// SLIDING MENU CHAT CONSOLE HUD SYSTEMS MANAGEMENT MODULES
function toggleLiveChat() { document.getElementById("liveChatPanel").classList.toggle("open"); }
function sendChatMessage() {
    const input = document.getElementById("chatInputMessage");
    const box = document.getElementById("chatBox");
    if (input.value.trim() === "") return;
    const msg = document.createElement("div");
    msg.className = "chat-line";
    msgLine = `<span class="user-tag core-user">You:</span> ${input.value.trim()}`;
    msg.innerHTML = msgLine; box.appendChild(msg);
    input.value = ""; box.scrollTop = box.scrollHeight;
}
function jumpToTime(s) { const p = document.getElementById("mainVideoNode"); p.currentTime = s; p.play(); }
function addNewTimestamp() {
    const p = document.getElementById("mainVideoNode");
    let sec = Math.floor(p.currentTime);
    const pill = document.createElement("div"); pill.className = "time-marker-pill";
    pill.onclick = () => jumpToTime(sec);
    pill.innerHTML = `<span class="badge-time">00:${sec.toString().padStart(2, '0')}</span> <span class="label-text">Pinned Snapshot Segment</span>`;
    document.getElementById("markersContainer").appendChild(pill);
}
function handleLike() { document.getElementById("likeCount").innerText = parseInt(document.getElementById("likeCount").innerText) + 1; }
function toggleSubscribe() { const b = document.getElementById("subBtn"); b.innerText = b.innerText === "SUBSCRIBE" ? "SUBSCRIBED" : "SUBSCRIBE"; }
