/**
 * Nexus Stream Ultra Pro - Social Ecosystem Master Engine Script
 */

let visualizerInterval = null;
let currentEarningBalance = 0.00;
let totalMonetizedSeconds = 0;
let monetizationTimer = null;

// Space Canvas Matrix Viewport Settings
let canvas = null, ctx = null;
let stars = [];
let maxStars = 150;
let spaceSpeed = 0.4;
let audioCtx = null;
let ambientOsc = null;
let spaceAnimationId = null;

// Authentication Identity Module Global Parameters
let currentUserIdentity = null;

document.addEventListener("DOMContentLoaded", () => {
    startVisualizerLoop();
    startMonetizationBilling();
    initSpaceMatrixEngine();
});

// MAIN APPLICATION ROUTER PLATFORM NAV DECK INTERACTIVE LOGIC
function switchTab(targetTabId) {
    document.querySelectorAll('.app-screen').forEach(screen => screen.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    document.getElementById(`${targetTabId}Screen`).classList.add('active');
    document.getElementById(`tab-${targetTabId}`).classList.add('active');
    
    triggerNotification(`Navigating interface core: ${targetTabId.toUpperCase()}`);

    if (targetTabId === 'space') {
        startSpaceLoopFrame();
    } else {
        if (spaceAnimationId) cancelAnimationFrame(spaceAnimationId);
    }

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

// USER ACCREDITATION PROTOCOL MANAGEMENT LOOPS (SIGN IN / SIGN UP)
function openAuthModal() {
    document.getElementById("authModal").classList.add("open");
}

function closeAuthModal() {
    document.getElementById("authModal").classList.remove("open");
}

function toggleAuthForm(mode) {
    document.querySelectorAll(".auth-tab").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".auth-form-view").forEach(view => view.classList.remove("active"));

    if (mode === 'signin') {
        document.getElementById("tabSignIn").classList.add("active");
        document.getElementById("signInFormBlock").classList.add("active");
    } else {
        document.getElementById("tabSignUp").classList.add("active");
        document.getElementById("signUpFormBlock").classList.add("active");
    }
}

function handleAuthentication(type) {
    if (type === 'signin') {
        const email = document.getElementById("signInEmail").value.trim();
        if(email === "") { triggerNotification("Identity string entry required.", "#dc2626"); return; }
        currentUserIdentity = email.split('@')[0];
    } else {
        const user = document.getElementById("signUpUser").value.trim();
        if(user === "") { triggerNotification("Username cannot remain blank.", "#dc2626"); return; }
        currentUserIdentity = user;
    }

    // Mutate Avatar Element inside top navigation panel matching parsed credential handles
    const profileNode = document.getElementById("headerProfileAvatar");
    profileNode.innerHTML = currentUserIdentity.substring(0,2).toUpperCase();
    profileNode.style.backgroundColor = "#10b981";
    profileNode.style.color = "#000000";

    triggerNotification(`Authorized access protocol successfully: Welcome @${currentUserIdentity}`, "#16a34a");
    closeAuthModal();
}

// CONTINUOUS CREATOR WALLET ACCRUAL SYSTEM PIXEL PIPELINES
function startMonetizationBilling() {
    const homePlayer = document.getElementById("mainVideoNode");
    const shortsPlayer = document.querySelector(".short-video-player");

    if (monetizationTimer) clearInterval(monetizationTimer);

    monetizationTimer = setInterval(() => {
        let isHomePlaying = (homePlayer && !homePlayer.paused && !homePlayer.ended);
        let isShortsPlaying = (shortsPlayer && !shortsPlayer.paused && !shortsPlayer.ended && document.getElementById("shortsScreen").classList.contains("active"));

        if (isHomePlaying || isShortsPlaying) {
            totalMonetizedSeconds += 1;
            currentEarningBalance += 0.02; // Base yield increment factor

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
    triggerNotification(`Cashout success! Sent $${currentEarningBalance.toFixed(2)} to external account grid.`, "#16a34a");
    currentEarningBalance = 0.00;
    document.getElementById("headerBalance").innerText = `$0.00`;
    document.getElementById("walletBalanceDisplay").innerText = `$0.00`;
}

// INGEST CONTROLS CORE INTERNET LOGIC
function executeStudioUpload() {
    const titleInput = document.getElementById("uploadTitleInput").value.trim();
    const fileSelector = document.getElementById("mobileVideoSelector");
    
    if (titleInput === "") { triggerNotification("Please enter a media track reference title code.", "#dc2626"); return; }
    if (fileSelector.files.length === 0) { triggerNotification("Please attach a video asset structure block first.", "#dc2626"); return; }

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
        triggerNotification("Video mapping detected. Ready to process inside Studio.");
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
    triggerNotification("Streaming active cloud node source thread...");
}

// HARDWARE WEB AUDIO SYNTH MUSIC OVERLAYS INJECTION
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
    triggerNotification(`Dispatched sound effect overlay [${type.toUpperCase()}]`);
}

// CANVAS STARFIELD VISUAL MATRIX INTERFACE VECTOR GENERATION
function initSpaceMatrixEngine() {
    canvas = document.getElementById("spaceCanvas");
    ctx = canvas.getContext("2d");
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
            let star = stars[i]; star.z -= spaceSpeed;
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
    triggerNotification(spaceSpeed > 1 ? "Hyper warp vector engine locked" : "Standard space cruise array returned.");
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

// REPETITIVE SOUND ANALYSIS MOCK ENGINE EQUALIZER LOOPS
function startVisualizerLoop() {
    const player = document.getElementById("mainVideoNode");
    const bars = document.querySelectorAll(".eq-bar");
    setInterval(() => {
        if (player && !player.paused && !player.ended) {
            bars.forEach(bar => { bar.style.height = `${Math.floor(Math.random() * 14) + 2}px`; });
        } else {
            bars.forEach(bar => bar.style.height = "2px");
        }
    }, 100);
}

// CONSOLE SLIDING LIVE CHAT STREAMS
function toggleLiveChat() { document.getElementById("liveChatPanel").classList.toggle("open"); }
function sendChatMessage() {
    const input = document.getElementById("chatInputMessage");
    const box = document.getElementById("chatBox");
    if (input.value.trim() === "") return;
    const msg = document.createElement("div");
    msg.className = "chat-line";
    let sender = currentUserIdentity ? currentUserIdentity : "GuestNomad";
    msg.innerHTML = `<span class="user-tag core-user">${sender}:</span> ${input.value.trim()}`;
    box.appendChild(msg); input.value = ""; box.scrollTop = box.scrollHeight;
}
function jumpToTime(s) { const p = document.getElementById("mainVideoNode"); p.currentTime = s; p.play(); }
function addNewTimestamp() {
    const p = document.getElementById("mainVideoNode");
    let sec = Math.floor(p.currentTime);
    const pill = document.createElement("div"); pill.className = "time-marker-pill";
    pill.onclick = () => jumpToTime(sec);
    pill.innerHTML = `<span class="badge-time">00:${sec.toString().padStart(2, '0')}</span> <span class="label-text">Pinned Milestone Segment</span>`;
    document.getElementById("markersContainer").appendChild(pill);
}
function handleLike() { document.getElementById("likeCount").innerText = parseInt(document.getElementById("likeCount").innerText) + 1; }
function toggleSubscribe() { const b = document.getElementById("subBtn"); b.innerText = b.innerText === "SUBSCRIBE" ? "SUBSCRIBED" : "SUBSCRIBE"; }
