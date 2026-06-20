/**
 * Global App Coordination State Routines
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

function triggerNotification(message, color = "#a855f7") {
    const toast = document.getElementById("toastContainer");
    if (!toast) return;
    toast.innerText = message;
    toast.style.borderLeftColor = color;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2500);
}

function executeStudioUpload() {
    const titleInput = document.getElementById("uploadTitleInput").value.trim();
    const fileSelector = document.getElementById("mobileVideoSelector");
    
    if (titleInput === "") { triggerNotification("Please supply an asset title label.", "#cc0000"); return; }
    if (fileSelector.files.length === 0) { triggerNotification("No video path object found.", "#cc0000"); return; }

    const file = fileSelector.files[0];
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");

    player.src = URL.createObjectURL(file);
    player.load();
    titleDisplay.innerText = titleInput;

    triggerNotification("Media package linked successfully!");
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
    triggerNotification("Saved to default playlist collection index folder.");
}

function toggleSubscribe() { 
    const b = document.getElementById("subBtn"); 
    if (b.innerText === "Pin Channel") {
        b.innerText = "Pinned";
        b.style.background = "var(--bg-input)";
        b.style.color = "var(--text-main)";
    } else {
        b.innerText = "Pin Channel";
        b.style.background = "var(--text-main)";
        b.style.color = "var(--bg-main)";
    }
}
