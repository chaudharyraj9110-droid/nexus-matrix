/**
 * UI Modularizer Engine - Manages view configuration parameters and time tracking
 */
let dailyScreenTimeSeconds = 0;
let userDefinedDailyMaxSeconds = Infinity;
let limitTimerInstance = null;

function applyInterfaceConfiguration() {
    // 1. Read layout visibility states from parameters
    const showShorts = document.getElementById("settingToggleShorts").checked;
    const showStories = document.getElementById("settingToggleStories").checked;
    const audioOnly = document.getElementById("settingAudioOnly").checked;
    const resolution = document.getElementById("settingResolution").value;
    const maxTimeMinutes = document.getElementById("settingTimeBudget").value;

    // 2. Modify visibility rules directly across the DOM structure
    const shortsTab = document.getElementById("tab-shorts");
    if (shortsTab) shortsTab.style.display = showShorts ? "flex" : "none";

    const storiesStrip = document.querySelector(".instagram-stories-strip");
    if (storiesStrip) storiesStrip.style.display = showStories ? "flex" : "none";

    // Apply Audio-Only Constraints
    const mainVideo = document.getElementById("mainVideoNode");
    if (mainVideo) {
        // Mock cutting video track processing
        mainVideo.style.opacity = audioOnly ? "0.05" : "1";
    }

    // Process Self-Imposed Limits
    if (maxTimeMinutes === "none") {
        userDefinedDailyMaxSeconds = Infinity;
        document.body.classList.remove("budget-exhausted");
    } else {
        userDefinedDailyMaxSeconds = parseInt(maxTimeMinutes) * 60;
    }

    triggerNotification("Operational layer layout metrics updated successfully.", "#10b981");
}

function initializeSystemBudgetTimer() {
    if (limitTimerInstance) clearInterval(limitTimerInstance);
    
    limitTimerInstance = setInterval(() => {
        const mainVideo = document.getElementById("mainVideoNode");
        const isWatching = mainVideo && !mainVideo.paused && !mainVideo.ended;

        if (isWatching) {
            dailyScreenTimeSeconds++;
            if (dailyScreenTimeSeconds >= userDefinedDailyMaxSeconds) {
                document.body.classList.add("budget-exhausted");
                triggerNotification("Daily viewing budget limit encountered. Interface grayscale forced.", "#ef4444");
            }
        }
    }, 1000);
}
