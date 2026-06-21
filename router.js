/**
 * Tab Navigation Router
 */
function switchTab(targetScreenId) {
    // Hide all view screens
    document.querySelectorAll(".app-screen").forEach(screen => {
        screen.classList.remove("active");
    });

    // Handle view mapping aliases to match production strings
    let resolvedId = targetScreenId;
    if (targetScreenId === 'home') resolvedId = 'homeScreen';
    if (targetScreenId === 'shorts') resolvedId = 'shortsScreen';
    if (targetScreenId === 'studio') resolvedId = 'studioScreen';
    if (targetScreenId === 'history') resolvedId = 'historyScreen';
    if (targetScreenId === 'settings') resolvedId = 'settingsScreen';

    const targetElement = document.getElementById(resolvedId);
    if (targetElement) {
        targetElement.classList.add("active");
    }

    // Toggle navigation buttons colors tracking states
    document.querySelectorAll(".nav-tab").forEach(tab => {
        tab.classList.remove("active");
    });
    
    const activeTabButton = document.getElementById(`tab-${targetScreenId}`);
    if (activeTabButton) {
        activeTabButton.classList.add("active");
    }

    // Lazy sync history layout tree when opening Vault tab
    if (targetScreenId === 'history' && typeof renderHistoryTree === 'function') {
        renderHistoryTree();
    }
}
