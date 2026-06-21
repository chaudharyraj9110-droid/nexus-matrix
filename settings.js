/**
 * UI Component Controls and Anti-Doomscroll Focus Loop Management
 */
let dailyScreenTimeSeconds = 0;
let userDefinedDailyMaxSeconds = Infinity;
let limitTimerInstance = null;

function applyInterfaceConfiguration() {
    const showShorts = document.getElementById("settingToggleShorts").checked;
    const showStories = document.getElementById("settingToggleStories").checked;
    const audioOnly = document.getElementById("settingAudioOnly").checked;
    const maxTimeMinutes = document.getElementById("settingTimeBudget").value;

    const shortsTab = document.getElementById("tab-shorts");
    if (shortsTab) shortsTab.style.display = showShorts ? "flex" : "none";

    const storiesStrip = document.querySelector(".instagram-stories-strip");
    if (storiesStrip) storiesStrip.style.display = showStories ? "flex" : "none";

    const mainVideo = document.getElementById("mainVideoNode");
    if (mainVideo) {
        mainVideo.style.opacity = audioOnly ? "0.02" : "1";
    }

    if (maxTimeMinutes === "none") {
        userDefinedDailyMaxSeconds = Infinity;
        document.body.classList.remove("budget-exhausted");
    } else {
        userDefinedDailyMaxSeconds = parseInt(maxTimeMinutes) * 60;
    }

    triggerNotification("Dashboard layout preferences saved.");
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
                triggerNotification("🚨 Daily viewing budget limit encountered. Interface grayscale forced.", "#ef4444");
            }
        }
    }, 1000);
}
