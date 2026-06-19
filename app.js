/**
 * Nexus Stream Video Control Engine Logic
 */

function triggerNotification(message, color = "#ff0000") {
    const toast = document.getElementById("toastContainer");
    toast.innerText = message;
    toast.style.borderLeftColor = color;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

// Intercept and load a real file from your Android device
function playSelectedVideo(event) {
    const file = event.target.files[0];
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");

    if (file) {
        const fileURL = URL.createObjectURL(file);
        player.src = fileURL;
        player.load();
        player.play();
        
        // Remove file path extensions from title text
        titleDisplay.innerText = file.name.replace(/\.[^/.]+$/, "");
        triggerNotification(`Playing Local File: ${file.name}`, "#10b981");
    }
}

// Load pre-configured open-source video stream assets
function loadPresetVideo(videoUrl, titleText) {
    const player = document.getElementById("mainVideoNode");
    const titleDisplay = document.getElementById("activeVideoTitle");
    
    player.src = videoUrl;
    player.load();
    player.play();
    
    titleDisplay.innerText = titleText;
    triggerNotification(`Streaming preset media channel...`, "#38bdf8");
    
    // Smoothly scroll back to the player viewport at top of screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleLike() {
    const likeSpan = document.getElementById("likeCount");
    let currentLikes = parseInt(likeSpan.innerText);
    likeSpan.innerText = currentLikes + 1;
    triggerNotification("Added to Liked Videos", "#10b981");
}

function toggleSubscribe() {
    const subBtn = document.getElementById("subBtn");
    if (subBtn.classList.contains("subscribed")) {
        subBtn.classList.remove("subscribed");
        subBtn.innerText = "SUBSCRIBE";
        subBtn.style.backgroundColor = "#f1f1f1";
    } else {
        subBtn.classList.add("subscribed");
        subBtn.innerText = "SUBSCRIBED";
        subBtn.style.backgroundColor = "#272727";
        triggerNotification("Subscribed to Channel", "#ff0000");
    }
}
