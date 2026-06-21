/**
 * Global Hub Event Execution Pipelines
 */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof resetSearchEngine === "function") {
        resetSearchEngine();
    }
    if (typeof initializeSystemBudgetTimer === "function") {
        initializeSystemBudgetTimer();
    }

    const mainPlayer = document.getElementById("mainVideoNode");
    if (mainPlayer) {
        mainPlayer.addEventListener("play", () => {
            if (typeof logPlaybackEventToHistory === "function") {
                logPlaybackEventToHistory(document.getElementById("activeVideoTitle").innerText);
            }
        });
    }
});

function triggerNotification(message, borderHexColor = "var(--accent)") {
    const toast = document.getElementById("toastContainer");
    if (!toast) return;
    toast.innerText = message;
    toast.style.borderLeftColor = borderHexColor;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

function executeStudioUpload() {
    const titleInput = document.getElementById("uploadTitleInput").value.trim();
    const fileSelector = document.getElementById("mobileVideoSelector");
    
    if (titleInput === "") { triggerNotification("Please supply an asset title label.", "#ef4444"); return; }
    if (fileSelector.files.length === 0) { triggerNotification("No video path object discovered.", "#ef4444"); return; }

    const file = fileSelector.files[0];
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");

    player.src = URL.createObjectURL(file);
    player.load();
    titleDisplay.innerText = titleInput;

    triggerNotification("🚀 Media package successfully mounted into the global feed grid deployment pipeline.");
    switchTab('home');
    player.play().catch(() => {});
}

function playSelectedVideo(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById("uploadTitleInput").value = file.name.replace(/\.[^/.]+$/, "");
        triggerNotification("Media stream prepared.");
        switchTab('studio');
    }
}

function loadPresetVideo(videoUrl, titleText) {
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");
    if (!player) return;
    
    player.src = videoUrl;
    player.load();
    titleDisplay.innerText = titleText;
    switchTab('home');
    player.play().catch(() => {});
}

function addNewTimestamp() {
    triggerNotification("📁 Node cached safely inside your default Watch Later bundle folder.", "var(--accent-glow)");
}

function toggleSubscribe() { 
    const b = document.getElementById("subBtn"); 
    if (b.innerText === "+ Pin Channel") {
        b.innerText = "✓ Channel Pinned";
        b.style.background = "var(--bg-input)";
        b.style.color = "var(--text-main)";
        b.style.border = "1px solid var(--border)";
        triggerNotification("📌 Creator linked directly to your personalized network pipeline.");
    } else {
        b.innerText = "+ Pin Channel";
        b.style.background = "var(--text-main)";
        b.style.color = "var(--bg-main)";
        b.style.border = "none";
        triggerNotification("Channel removed from pins.");
    }
}
