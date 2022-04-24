console.log('background loaded');

chrome.action.setBadgeBackgroundColor({color : "#0fa600"});
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == 'from cs') {
        port.onMessage.addListener(function(msg) {
            if (msg.message == 'showBadge') {
                chrome.action.setBadgeText({ text: 'find' });
                setTimeout(function () {chrome.action.setBadgeText({text : ''})}, 9000);
                setTimeout(function () {port.disconnect()}, 4000);
            }
        })
    }
});
