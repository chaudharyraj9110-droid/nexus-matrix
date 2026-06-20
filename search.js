/**
 * Command-Center Search Engine - Hard Core Text Parsing Pipeline
 */
let searchInLibraryMode = false; // False = Global Network, True = Search Only Inside Local History Storage

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
        badge.innerHTML = `<i class="fas fa-database"></i> <span>MY LIBRARY</span>`;
        badge.classList.add("local-mode");
        triggerNotification("Search set to local user history context.", "#10b981");
    } else {
        badge.innerHTML = `<i class="fas fa-globe"></i> <span>GLOBAL</span>`;
        badge.classList.remove("local-mode");
        triggerNotification("Search set to global network entries.");
    }
}

function executeCommandSearch() {
    const inputNode = document.getElementById("globalSearchInput");
    let rawQuery = inputNode.value.trim().toLowerCase();
    if (rawQuery === "") { renderFeedGrid(globalVideoNetworkDatabase); return; }

    // Parse specific query flags (e.g., "-clickbait" extraction)
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

    // Apply Local Library context filter logic if enabled
    if (searchInLibraryMode) {
        targetDataSet = globalVideoNetworkDatabase.filter(item => 
            historyLogRecords.some(historyNode => historyNode.title === item.title)
        );
    }

    // Execute precision filtering match queries
    let filteredResults = targetDataSet.filter(video => {
        const title = video.title.toLowerCase();
        const channel = video.channel.toLowerCase();

        // 1. Must match standard keywords if any exist
        let matchesSearch = searchTerms.length === 0 || searchTerms.every(term => title.includes(term) || channel.includes(term));
        // 2. Must not match any excluded terms
        let containsExcluded = excludedTerms.some(term => title.includes(term) || channel.includes(term));

        return matchesSearch && !containsExcluded;
    });

    renderFeedGrid(filteredResults);
    triggerNotification(`Found ${filteredResults.length} matches across storage arrays.`, "#10b981");
}

function resetSearchEngine() {
    document.getElementById("globalSearchInput").value = "";
    renderFeedGrid(globalVideoNetworkDatabase);
}

function renderFeedGrid(dataset) {
    const grid = document.getElementById("mainVideoFeedGrid");
    if (!grid) return;
    grid.innerHTML = `<h3 class="feed-section-heading">Filter Space Matrix Results (${dataset.length})</h3>`;
    
    if (dataset.length === 0) {
        grid.innerHTML += `<div style="padding:40px 0;text-align:center;color:var(--text-dark-muted);font-size:12px;">No non-excluded assets found matching constraints.</div>`;
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

