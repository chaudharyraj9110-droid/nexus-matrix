/**
 * Nexus Matrix System Logic blueprint
 */

// IMMUTABLE MEDIA LEDGER REGISTRY
const globalMediaNetworkLedgerIndex = [
    { id: "vx-1", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Big Buck Bunny Production Open Animation Source", channel: "Blender Foundation Cluster", duration: "09:56", views: "1.2M view tracks" },
    { id: "vx-2", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Elephants Dream Special Open Source VFX Project", channel: "VFX Lab Studio Array", duration: "14:53", views: "894K view tracks" },
    { id: "vx-3", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Blaze Tech: Hardware Infrastructure Overview", channel: "BlazeTech Infrastructure Logs", duration: "00:15", views: "3.1M view tracks" },
    { id: "vx-4", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", title: "Subaru Outback Performance Metrics Offroad Test Run", channel: "DriveLog Automotive Matrix", duration: "00:12", views: "412K view tracks" }
];

let indexingLocalHistoryContextMode = false;
let incognitoActivePrivacyMatrixState = false;
let monitoredPlaybackTicksCount = 0;
let allocatedFocusBudgetLimitSeconds = Infinity;
let budgetEvaluationIntervalInstance = null;
let localPlaybackHistoryBufferTrack = [];

// ATTACH RUNTIME EVENT INTERFACE LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    compileRecommendationGridIndex(globalMediaNetworkLedgerIndex);
    initializeFocusBudgetEvaluationLoop();

    // Mapping Form Elements Hooks
    document.getElementById("searchExecuteBtn").addEventListener("click", executeNexusQuerySearch);
    document.getElementById("indexingScopeBadge").addEventListener("click", toggleIndexingScope);
    document.getElementById("notificationBellBtn").addEventListener("click", () => triggerToastNotification('Alerts matrix clean. No active channel broadcasts detected.'));
    document.getElementById("nexusPinBtn").addEventListener("click", toggleChannelPinState);
    document.getElementById("privacyMatrixToggleBtn").addEventListener("click", toggleIncognitoPrivacyMatrix);
    document.getElementById("focusBudgetSelector").addEventListener("change", alterFocusBudgetSetting);
    document.getElementById("nexusSearchInput").addEventListener("keydown", (e) => { if(e.key === 'Enter') executeNexusQuerySearch(); });
    document.getElementById("collectToBundleBtn").addEventListener("click", () => triggerToastNotification('Node cached safely inside your default collection.'));

    // Wire Core Sidebar Buttons to throw mock feedback
    const genericSidebarRoutes = ['navStreamHome', 'navMicroLoops', 'navCreatorSuite', 'navMyVault', 'navHistoryLog', 'navInterfaceSettings'];
    genericSidebarRoutes.forEach(id => {
        document.getElementById(id).addEventListener("click", (e) => {
            if(id !== 'navStreamHome') {
                triggerToastNotification(`Mock Action Triggered: Loaded subsystem context inside panel mapping for ${e.target.innerText.trim()}.`);
            }
        });
    });

    const primaryPlayer = document.getElementById("nexusPrimaryVideoNode");
    if (primaryPlayer) {
        primaryPlayer.addEventListener("play", () => {
            if (!incognitoActivePrivacyMatrixState) {
                const activeTitle = document.getElementById("nexusActiveVideoTitle").innerText;
                if (!localPlaybackHistoryBufferTrack.includes(activeTitle)) {
                    localPlaybackHistoryBufferTrack.push(activeTitle);
                }
            }
        });
    }
});

function triggerToastNotification(messageText, leftBorderColorOverride = "var(--accent-neon-cyan)") {
    const toastElement = document.getElementById("nexusToastNode");
    if (!toastElement) return;
    toastElement.innerText = messageText;
    toastElement.style.borderLeftColor = leftBorderColorOverride;
    toastElement.classList.add("display-active");
    setTimeout(() => { toastElement.classList.remove("display-active"); }, 3500);
}

function toggleIndexingScope() {
    indexingLocalHistoryContextMode = !indexingLocalHistoryContextMode;
    const badgeElement = document.getElementById("indexingScopeBadge");
    if (indexingLocalHistoryContextMode) {
        badgeElement.innerHTML = `<i class="fas fa-box-open"></i> <span>LOCAL VAULT INDEX</span>`;
        badgeElement.style.background = "rgba(6, 182, 212, 0.2)";
        badgeElement.style.borderColor = "var(--accent-neon-cyan)";
        triggerToastNotification("Swapping search index target vectors over to local Vault History caches.", "var(--accent-neon-cyan)");
    } else {
        badgeElement.innerHTML = `<i class="fas fa-globe"></i> <span>GLOBAL DEPLOYMENT INDEX</span>`;
        badgeElement.style.background = "rgba(139, 92, 246, 0.2)";
        badgeElement.style.borderColor = "var(--accent-neon-violet)";
        triggerToastNotification("Reconnecting search tracking parameters to the platform global ledger registries.", "var(--accent-neon-violet)");
    }
    executeNexusQuerySearch();
}

function executeNexusQuerySearch() {
    const queryInputField = document.getElementById("nexusSearchInput");
    const processedCleanQuery = queryInputField.value.trim().toLowerCase();
    
    let queryTokensArray = [];
    let excludedTokensArray = [];

    processedCleanQuery.split(" ").forEach(token => {
        if (token.startsWith("-") && token.length > 1) {
            excludedTokensArray.push(token.substring(1));
        } else if (token !== "") {
            queryTokensArray.push(token);
        }
    });

    let coreSearchBaselineDataset = globalMediaNetworkLedgerIndex;

    if (indexingLocalHistoryContextMode) {
        coreSearchBaselineDataset = globalMediaNetworkLedgerIndex.filter(videoItem => 
            localPlaybackHistoryBufferTrack.includes(videoItem.title)
        );
    }

    const searchMatchesResultsOutput = coreSearchBaselineDataset.filter(videoRecord => {
        const titleStr = videoRecord.title.toLowerCase();
        const channelStr = videoRecord.channel.toLowerCase();

        const parsingMatchesTerms = queryTokensArray.length === 0 || queryTokensArray.every(term => titleStr.includes(term) || channelStr.includes(term));
        const parsingMatchesExclusions = excludedTokensArray.some(excludedTerm => titleStr.includes(excludedTerm) || channelStr.includes(excludedTerm));

        return parsingMatchesTerms && !parsingMatchesExclusions;
    });

    compileRecommendationGridIndex(searchMatchesResultsOutput);
}

function compileRecommendationGridIndex(datasetRecordRows) {
    const targetContainer = document.getElementById("recommendationsOutputTargetContainer");
    if (!targetContainer) return;
    targetContainer.innerHTML = "";

    if (datasetRecordRows.length === 0) {
        targetContainer.innerHTML = `<div style="font-size:12px;color:var(--text-secondary-muted);padding:30px 0;text-align:center;border:1px dashed var(--border-glow-line);border-radius:8px;">No index paths match your active search parameter exclusions.</div>`;
        return;
    }

    datasetRecordRows.forEach(videoNode => {
        const recommendationRowElement = document.createElement("div");
        recommendationRowElement.className = "vortex-recommendation-row-card";
        recommendationRowElement.onclick = () => mountTargetStreamIntoCanvas(videoNode.url, videoNode.title, videoNode.channel);
        recommendationRowElement.innerHTML = `
            <div class="card-preview-canvas-frame">
                <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300">
                <span class="card-timestamp-duration-badge">${videoNode.duration}</span>
            </div>
            <div class="card-informational-metadata-stack">
                <h4>${videoNode.title}</h4>
                <p>${videoNode.channel}</p>
                <p>${videoNode.views}</p>
            </div>
        `;
        targetContainer.appendChild(recommendationRowElement);
    });
}

function mountTargetStreamIntoCanvas(streamTargetUrl, visualTitleText, trackingHubChannelName) {
    const playerInstance = document.getElementById("nexusPrimaryVideoNode");
    const visualTitleNode = document.getElementById("nexusActiveVideoTitle");
    
    if (!playerInstance) return;
    playerInstance.src = streamTargetUrl;
    playerInstance.load();
    visualTitleNode.innerText = visualTitleText;
    
    document.getElementById("curatorAvatarIcon").innerText = trackingHubChannelName.substring(0, 2).toUpperCase();
    document.getElementById("curatorNameLabel").innerText = trackingHubChannelName;

    playerInstance.play().catch(() => {});
    triggerToastNotification(`Routing stream: ${visualTitleText.substring(0, 30)}...`);
}

function toggleChannelPinState() {
    const pinBtnNode = document.getElementById("nexusPinBtn");
    if (pinBtnNode.classList.contains("pinned-state")) {
        pinBtnNode.classList.remove("pinned-state");
        pinBtnNode.innerText = "+ Pin Channel";
        pinBtnNode.style.background = "var(--text-primary-white)";
        pinBtnNode.style.color = "var(--bg-pitch-black)";
        triggerToastNotification("Channel entry removed from pinned indices arrays.");
    } else {
        pinBtnNode.classList.add("pinned-state");
        pinBtnNode.innerText = "✓ Channel Pinned";
        pinBtnNode.style.background = "var(--bg-input-field)";
        pinBtnNode.style.color = "var(--text-primary-white)";
        triggerToastNotification("📌 Creator track pipeline securely pinned into structural navigation feeds.", "var(--accent-neon-violet)");
    }
}

function toggleIncognitoPrivacyMatrix() {
    incognitoActivePrivacyMatrixState = !incognitoActivePrivacyMatrixState;
    const privacyIconNode = document.getElementById("privacyMatrixIcon");
    const privacyLabelNode = document.getElementById("privacyMatrixLabel");

    if (incognitoActivePrivacyMatrixState) {
        privacyIconNode.className = "fas fa-user-secret active-glow";
        privacyLabelNode.innerText = "Log History On";
        triggerToastNotification("🔒 Privacy Matrix active. Local activity caching and history logs safely paused.", "var(--accent-neon-cyan)");
    } else {
        privacyIconNode.className = "fas fa-eye-slash";
        privacyIconNode.style.color = "inherit";
        privacyLabelNode.innerText = "Log History Off";
        triggerToastNotification("👁️ Privacy Matrix offline. Chronological history tracking resumed.", "var(--accent-neon-violet)");
    }
}

function alterFocusBudgetSetting() {
    const budgetSelectorValue = document.getElementById("focusBudgetSelector").value;
    if (budgetSelectorValue === "none") {
        allocatedFocusBudgetLimitSeconds = Infinity;
        document.body.classList.remove("focus-budget-exhausted");
    } else {
        allocatedFocusBudgetLimitSeconds = parseInt(budgetSelectorValue);
        monitoredPlaybackTicksCount = 0;
        document.body.classList.remove("focus-budget-exhausted");
    }
    triggerToastNotification("Anti-Doomscroll threshold preference tracking arrays recalculated.");
}

function initializeFocusBudgetEvaluationLoop() {
    if (budgetEvaluationIntervalInstance) clearInterval(budgetEvaluationIntervalInstance);
    budgetEvaluationIntervalInstance = setInterval(() => {
        const playerElement = document.getElementById("nexusPrimaryVideoNode");
        const platformIsCurrentlyStreaming = playerElement && !playerElement.paused && !playerElement.ended;

        if (platformIsCurrentlyStreaming) {
            monitoredPlaybackTicksCount++;
            if (monitoredPlaybackTicksCount >= allocatedFocusBudgetLimitSeconds) {
                document.body.classList.add("focus-budget-exhausted");
                triggerToastNotification("🚨 Focus sandbox ceiling encountered. Application structural grayscale forced.", "#ef4444");
            }
        }
    }, 1000);
}
