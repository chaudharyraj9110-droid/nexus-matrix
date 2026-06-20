/**
 * Memory Bank Engine - Handles session isolation and local history tracking
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
        icon.style.color = "#f59e0b";
        label.innerText = "Incognito Lock Active";
        triggerNotification("Watch tracking suspended for active playback elements.", "#f59e0b");
    } else {
        icon.className = "fas fa-eye-slash";
        icon.style.color = "inherit";
        label.innerText = "Standard Session";
        triggerNotification("History engine active on normal tracking arrays.");
    }
}

function logPlaybackEventToHistory(videoTitle) {
    if (sessionIncognitoState) return; // Drop tracing nodes silently
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const uuid = Math.floor(Math.random() * 100000);
    
    // Check and clear identical titles to avoid duplicates
    historyLogRecords = historyLogRecords.filter(node => node.title !== videoTitle);
    
    historyLogRecords.unshift({
        id: uuid,
        title: videoTitle,
        timeString: timestamp
    });
}

function createNewSessionBundle() {
    if (historyLogRecords.length === 0) {
        triggerNotification("Active history cache empty. Cannot compile tracking bundle.", "#cc0000");
        return;
    }
    
    const bundleId = Math.floor(Math.random() * 10000);
    const bundleName = prompt("Assign Research Session Folder Label Title:", `Session Log Array #${bundleId}`);
    if (!bundleName) return;

    historicalSessionBundles.unshift({
        id: bundleId,
        name: bundleName,
        nodes: [...historyLogRecords]
    });

    historyLogRecords = []; // Flush tracking register into folder arrays
    renderHistoryTree();
    triggerNotification("Session bundle archived inside local memory bank.", "#10b981");
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
    triggerNotification("Specific tracking node erased completely.");
}

function clearAllHistory() {
    historyLogRecords = [];
    historicalSessionBundles = [];
    renderHistoryTree();
    triggerNotification("All local memory-bank records purged completely.", "#ef4444");
}

function renderHistoryTree() {
    const wrapper = document.getElementById("historySessionsContainer");
    if (!wrapper) return;
    wrapper.innerHTML = "";

    // 1. Present Active Loose Sessions Stack
    const currentContainer = document.createElement("div");
    currentContainer.className = "session-folder-card";
    currentContainer.innerHTML = `
        <div class="folder-header">
            <div class="folder-title-area"><i class="fas fa-clock-rotate-left" style="color:var(--accent);"></i> Active Watch Buffers</div>
            <span style="font-size:11px;color:var(--text-dark-muted);">${historyLogRecords.length} items</span>
        </div>
        <div class="folder-nodes-list" id="activeNodesList"></div>
    `;
    wrapper.appendChild(currentContainer);

    const activeList = currentContainer.querySelector("#activeNodesList");
    if (historyLogRecords.length === 0) {
        activeList.innerHTML = `<div style="font-size:11px;color:var(--text-dark-muted);padding:6px 0;">No unbundled session entries recorded.</div>`;
    } else {
        historyLogRecords.forEach(node => {
            const row = document.createElement("div");
            row.className = "history-node-row";
            row.innerHTML = `
                <div class="node-meta"><strong>${node.title}</strong><span>Logged at ${node.timeString}</span></div>
                <button class="delete-node-btn" onclick="deleteSingleHistoryNode(${node.id})">&times;</button>
            `;
            activeList.appendChild(row);
        });
    }

    // 2. Render Bundled Folders Stack
    historicalSessionBundles.forEach(bundle => {
        const fCard = document.createElement("div");
        fCard.className = "session-folder-card";
        fCard.innerHTML = `
            <div class="folder-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                <div class="folder-title-area"><i class="fas fa-folder"></i> <span>${bundle.name}</span></div>
                <span style="font-size:11px;color:var(--text-dark-muted);">${bundle.nodes.length} nodes (Click to Toggle)</span>
            </div>
            <div class="folder-nodes-list" style="display:block;"></div>
        `;
        const listContainer = fCard.querySelector(".folder-nodes-list");
        bundle.nodes.forEach(node => {
            const row = document.createElement("div");
            row.className = "history-node-row";
            row.innerHTML = `
                <div class="node-meta"><strong>${node.title}</strong><span>Archived Log Element</span></div>
                <button class="delete-node-btn" onclick="deleteSingleHistoryNode(${node.id}, ${bundle.id})">&times;</button>
            `;
            listContainer.appendChild(row);
        });
        wrapper.appendChild(fCard);
    });
}
