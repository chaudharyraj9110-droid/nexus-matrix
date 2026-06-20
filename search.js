/**
 * LoopDeck Core Search Filter Processing Engine
 */
let searchInLibraryMode = false;

const globalVideoNetworkDatabase = [
    { id: 1, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Big Buck Bunny Production Open Animation Source", channel: "Blender Foundation", duration: "09:56" },
    { id: 2, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Elephants Dream Special Open Source VFX Project", channel: "VFX Lab Studio", duration: "14:53" },
    { id: 3, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Blaze Tech: Hardware Infrastructure Overview", channel: "BlazeTech Log", duration: "00:15" },
    { id: 4, url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", title: "Subaru Outback Performance Metrics Offroad", channel: "DriveLog Automotive", duration: "00:12" }
];

function toggleSearchScope() {
    searchInLibraryMode = !searchInLibraryMode;
    const badge = document.getElementById("searchScopeScope");
    if (searchInLibraryMode) {
        badge.innerHTML = `<i class="fas fa-box-open"></i> <span>MY RECAP INDEX</span>`;
        badge.classList.add("local-mode");
        triggerNotification("Searching strictly inside personal local history index registries.");
    } else {
        badge.innerHTML = `<i class="fas fa-network-wired"></i> <span>ALL CONTENT</span>`;
        badge.classList.remove("local-mode");
        triggerNotification("Scanning global platform ledger directories.");
    }
}

function executeCommandSearch() {
    const inputNode = document.getElementById("globalSearchInput");
    let rawQuery = inputNode.value.trim().toLowerCase();
    if (rawQuery === "") { renderFeedGrid(globalVideoNetworkDatabase); return; }

    let searchTerms = [];
    let excludedTerms = [];
    
    rawQuery.split(" ").forEach(token => {
        if (token.startsWith("-") && token.length > 1) {
            excludedTerms.push(token.substring(1));
        } else {
            searchTerms.push(token);
        }
    });

    let targetDataSet = globalVideoNetworkDatabase;

    if (searchInLibraryMode) {
        targetDataSet = globalVideoNetworkDatabase.filter(item => 
            historyLogRecords.some(historyNode => historyNode.title === item.title)
        );
    }

    let filteredResults = targetDataSet.filter(video => {
        const title = video.title.toLowerCase();
        const channel = video.channel.toLowerCase();

        let matchesSearch = searchTerms.length === 0 || searchTerms.every(term => title.includes(term) || channel.includes(term));
        let containsExcluded = excludedTerms.some(term => title.includes(term) || channel.includes(term));

        return matchesSearch && !containsExcluded;
    });

    renderFeedGrid(filteredResults);
}

function resetSearchEngine() {
    document.getElementById("globalSearchInput").value = "";
    renderFeedGrid(globalVideoNetworkDatabase);
}

function renderFeedGrid(dataset) {
    const grid = document.getElementById("mainVideoFeedGrid");
    if (!grid) return;
    grid.innerHTML = `<h3 class="feed-section-heading">Discovered Index Streams (${dataset.length})</h3>`;
    
    if (dataset.length === 0) {
        grid.innerHTML += `<div style="padding:40px 0;text-align:center;color:var(--text-dark-muted);font-size:12px;">No matching index paths found matching the keyword filters.</div>`;
        return;
    }

    dataset.forEach(video => {
        const card = document.createElement("div");
        card.className = "thumbnail-card";
        card.onclick = () => loadPresetVideo(video.url, video.title);
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400">
                <span class="duration-badge">${video.duration}</span>
            </div>
            <div class="card-meta">
                <h4>${video.title}</h4>
                <p>${video.channel}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}
