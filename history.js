/**
 * Isolated Cache Logs and Playlist Ingestion Layer
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
        icon.style.color = "var(--accent)";
        label.innerText = "Log History Off";
        triggerNotification("Activity history tracking suspended safely.");
    } else {
        icon.className = "fas fa-eye-slash";
        icon.style.color = "inherit";
        label.innerText = "Log History On";
        triggerNotification("Activity path trail active.");
    }
}

function logPlaybackEventToHistory(videoTitle) {
    if (sessionIncognitoState) return; 
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const uuid = Math.floor(Math.random() * 100000);
    
    historyLogRecords = historyLogRecords.filter(node => node.title !== videoTitle);
    
    historyLogRecords.unshift({
        id: uuid,
        title: videoTitle,
        timeString: timestamp
    });
}

function createNewSessionBundle() {
    if (historyLogRecords.length === 0) {
        triggerNotification("Active history log pool empty.", "#cc0000");
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

    // 1. Current Active Loose Unbundled Records Stack
    const currentContainer = document.createElement("div");
    currentContainer.className = "session-folder-card";
    currentContainer.innerHTML = `
        <div class="folder-header">
            <div class="folder-title-area"><i class="fas fa-timeline" style="color:var(--accent);"></i> Unsaved Session Watch Logs</div>
            <span style="font-size:11px;color:var(--text-dark-muted);">${historyLogRecords.length} points</span>
        </div>
        <div class="folder-nodes-list" id="activeNodesList"></div>
    `;
    wrapper.appendChild(currentContainer);

    const activeList = currentContainer.querySelector("#activeNodesList");
    if (historyLogRecords.length === 0) {
        activeList.innerHTML = `<div style="font-size:11px;color:var(--text-dark-muted);padding:12px;text-align:center;">No recent activity records found in active cache.</div>`;
    } else {
        historyLogRecords.forEach(node => {
            const row = document.createElement("div");
            row.className = "history-node-row";
            row.innerHTML = `
                <div class="node-meta"><strong>${node.title}</strong><span>Indexed at ${node.timeString}</span></div>
                <button class="delete-node-btn" onclick="deleteSingleHistoryNode(${node.id})">&times;</button>
            `;
            activeList.appendChild(row);
        });
    }

    // 2. Playlists / Compiled Session Folders Stack
    historicalSessionBundles.forEach(bundle => {
        const fCard = document.createElement("div");
        fCard.className = "session-folder-card";
        fCard.innerHTML = `
            <div class="folder-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
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

