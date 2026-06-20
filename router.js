/**
 * Router Node Engine - Coordinates tab navigation and system-level states
 */
function switchTab(targetTabId) {
    // 1. Terminate view layouts cleanly
    document.querySelectorAll('.app-screen').forEach(screen => screen.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    // 2. Map interface node state arrays
    const targetScreen = document.getElementById(`${targetTabId}Screen`);
    const targetTabBtn = document.getElementById(`tab-${targetTabId}`);
    
    if (targetScreen && targetTabBtn) {
        targetScreen.classList.add('active');
        targetTabBtn.classList.add('active');
    }

    // 3. Coordinate runtime media updates
    const shortPlayer = document.querySelector('.short-video-player');
    if (targetTabId === 'shorts') {
        if (shortPlayer) shortPlayer.play().catch(() => {});
    } else {
        if (shortPlayer) shortPlayer.pause();
    }

    // Refresh memory bank views on mount
    if (targetTabId === 'history') {
        renderHistoryTree();
    }
}
