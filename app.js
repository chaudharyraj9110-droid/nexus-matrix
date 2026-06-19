/**
 * Nexus Mobile Core JavaScript File
 */

document.addEventListener("DOMContentLoaded", () => {
    initAIListeners();
});

function triggerNotification(message, duration = 3500, color = "#38bdf8") {
    const toast = document.getElementById("toastContainer");
    toast.innerText = message;
    toast.style.borderLeftColor = color;
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}

function initAIListeners() {
    const privacyToggle = document.getElementById("privacyShieldToggle");
    const privacyShield = document.getElementById("privacyShield");
    
    privacyToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
            privacyShield.style.opacity = "1";
            triggerNotification("AI Mobile Privacy Blur Activated", 2000, "#10b981");
        } else {
            privacyShield.style.opacity = "0";
            triggerNotification("Privacy Protection Suspended", 2500, "#f43f5e");
        }
    });
}

function toggleTrack(trackType) {
    triggerNotification(`Inspecting track channel component: [${trackType.toUpperCase()}]`, 1500);
}

function simulateCopyrightStrike() {
    const audioLane = document.getElementById("laneAudio");
    const audioPill = document.getElementById("audioPill");
    const protectionBadge = document.getElementById("protectionBadge");
    
    triggerNotification("⚠️ DMCA Flag Matched! Threat Detected.", 2500, "#f43f5e");
    
    audioLane.classList.add("hit");
    protectionBadge.classList.add("claimed");
    protectionBadge.innerHTML = `<i class="fas fa-triangle-exclamation"></i> Swapping Core...`;
    
    setTimeout(() => {
        audioPill.innerText = "ai_procedural_safe_synth.mp3";
        audioLane.classList.remove("hit");
        protectionBadge.classList.remove("claimed");
        protectionBadge.innerHTML = `<i class="fas fa-gavel"></i> Safe Mode`;
        
        triggerNotification("🛡️ System Isolated. Third-party wave profile swapped for clean AI synth track. Container remains active!", 4500, "#10b981");
    }, 2000);
}

function deploySmartContract() {
    const address = document.getElementById("walletAddress").value.trim();
    const split = document.getElementById("splitPercentage").value;
    const walletDisplay = document.getElementById("walletDisplay");

    if (!address.startsWith("0x") || address.length < 8) {
        triggerNotification("Error: Invalid cryptographic wallet destination target signature.", 2500, "#f43f5e");
        return;
    }

    if (!split || split < 1 || split > 100) {
        triggerNotification("Error: Set percentage bounds between 1-100%.", 2500, "#f43f5e");
        return;
    }

    triggerNotification("🔄 Uploading signature to local validating blocks...", 1500, "#a855f7");

    setTimeout(() => {
        walletDisplay.innerHTML = `<i class="fas fa-wallet"></i> 1.281 ETH`;
        triggerNotification(`🚀 Broadcaster Success: ${split}% node-split successfully committed to immutable contract!`, 4000, "#10b981");
    }, 1800);
}

