/**
 * Isolated Cache Logs and Playlist Grouping Engine
 */
let historyLogRecords = [];
let historicalSessionBundles = [];
let sessionIncognitoState = false;

function toggleIncognitoMode() {
    sessionIncognitoState = !sessionIncognitoState;
    const icon = document.getElementById("incognitoIcon");
    const label = document.getElementById("incognitoTxt");
    
    if (sessionIncognitoState) {
        icon.className = "fas fa-user-secret";
        icon.style.color = "var(--accent-glow)";
        label.innerText = "Log History On";
        triggerNotification("🔒 Privacy Matrix active. Local activity caching and history logs safely paused.", "var(--accent-glow)");
    } else {
        icon.className = "fas fa-eye-slash";
        icon.style.color = "inherit";
        label.innerText = "Log History Off";
        triggerNotification("👁️ Privacy Matrix offline. Chronological history tracking resumed.", "var(--accent)");
    }
}

function logPlaybackEventToHistory(videoTitle) {
    if (sessionIncognitoState) return; 
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const uuid = Math.floor(Math.random() * 100000);
    
    historyLogRecords = historyLogRecords.filter(node => node.title !== videoTitle);
    historyLogRecords.unshift({ id: uuid, title: videoTitle, timeString: timestamp });
}

function createNewSessionBundle() {
    if (historyLogRecords.length === 0) {
        triggerNotification("Active history log pool empty.", "#ef4444");
        return;
    }
    
    const bundleName = prompt("Assign new playlist bundle identifier title:");
    if (!bundleName) return;

    historicalSessionBundles.unshift({
        id: Math.floor(Math.random() * 10000),
        name: bundleName,
        nodes: [...historyLogRecords]
    });

    historyLogRecords = []; 
    renderHistoryTree();
    triggerNotification("Custom playlist group compiled successfully.");
}

function deleteSingleHistoryNode(nodeId, bundleId = null) {
    if (bundleId) {
        const targetBundle = historicalSessionBundles.find(b => b.id === bundleId);
        if (targetBundle) {
            targetBundle.nodes = targetBundle.nodes.filter(n => n.id !== nodeId);
            if (targetBundle.nodes.length === 0) {
                historicalSessionBundles = historicalSessionBundles.filter(b => b.id !== bundleId);
            }
        }
    } else {
        historyLogRecords = historyLogRecords.filter(n => n.id !== nodeId);
    }
    renderHistoryTree();
    triggerNotification("Index record entry erased.");
}

function clearAllHistory() {
    historyLogRecords = [];
    historicalSessionBundles = [];
    renderHistoryTree();
    triggerNotification("Local cache index registries flushed completely.");
}

function renderHistoryTree() {
    const wrapper = document.getElementById("historySessionsContainer");
    if (!wrapper) return;
    wrapper.innerHTML = "";

    // Unsorted Cache Track Frame
    const currentContainer = document.createElement("div");
    currentContainer.className = "session-folder-card";
    currentContainer.innerHTML = `
        <div class="folder-header">
            <div class="folder-title-area"><i class="fas fa-timeline"></i> Recent Loose Session Watch Logs</div>
            <span style="font-size:11px;color:var(--text-dark-muted);">${historyLogRecords.length} points</span>
        </div>
        <div class="folder-nodes-list" id="activeNodesList"></div>
    `;
    wrapper.appendChild(currentContainer);

    const activeList = currentContainer.querySelector("#activeNodesList");
    if (historyLogRecords.length === 0) {
        activeList.innerHTML = `<div style="font-size:11px;color:var(--text-dark-muted);padding:12px;text-align:center;">No recent activity records found in active cache registries.</div>`;
    } else {
        historyLogRecords.forEach(node => {
            const row = document.createElement("div");
            row.className = "history-node-row";
            row.innerHTML = `
                <div class="node-meta"><strong>${node.title}</strong><span>Indexed today at ${node.timeString}</span></div>
                <button class="delete-node-btn" onclick="deleteSingleHistoryNode(${node.id})">&times;</button>
            `;
            activeList.appendChild(row);
        });
    }

    // Custom Playlists Bundles 
    historicalSessionBundles.forEach(bundle => {
        const fCard = document.createElement("div");
        fCard.className = "session-folder-card";
        fCard.innerHTML = `
            <div class="folder-header" onclick="this.nextElementSibling.style.with = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                <div class="folder-title-area"><i class="fas fa-folder-closed"></i> <span>${bundle.name}</span></div>
                <span style="font-size:11px;color:var(--text-dark-muted);">${bundle.nodes.length} items (Tap to expand)</span>
            </div>
            <div class="folder-nodes-list" style="display:block;"></div>
        `;
        const listContainer = fCard.querySelector(".folder-nodes-list");
        bundle.nodes.forEach(node => {
            const row = document.createElement("div");
            row.className = "history-node-row";
            row.innerHTML = `
                <div class="node-meta"><strong>${node.title}</strong><span>Bundled media node</span></div>
                <button class="delete-node-btn" onclick="deleteSingleHistoryNode(${node.id}, ${bundle.id})">&times;</button>
            `;
            listContainer.appendChild(row);
        });
        wrapper.appendChild(fCard);
    });
}
