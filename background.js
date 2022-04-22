console.log('background loaded');
chrome.action.setBadgeText({ text: 'load' })
// setTimeout(function () {chrome.action.setBadgeText({text : ''})}, 3000);
chrome.runtime.onConnect.addListener(function(port) {
    console.log(port)
    if (port.name == 'from cs') {
        chrome.action.setBadgeText({ text: 'port' })
        setTimeout(function () {chrome.action.setBadgeText({text : ''})}, 3000);
        // setTimeout(function () {port.disconnect()}, 4000);
        port.onMessage.addListener(function(msg) {
            if (msg.message == 'showBadge') {
                chrome.action.setBadgeText({ text: 'find' });
                setTimeout(function () {chrome.action.setBadgeText({text : ''})}, 5000);
                setTimeout(function () {port.disconnect()}, 4000);

            }
        })
    }
});

// url submit proposal be like 
// https://www.upwork.com/ab/proposals/job/~01782731d033afed98/apply/


// chrome.webNavigation.onHistoryStateUpdated.addListener(function(a) {
//     console.log("webnav" + a);
//             chrome.action.setBadgeText({ text: 'hist' });
//     chrome.storage.onChanged.addListener(function(changes, areaName) {
//         console.log(Object.keys(changes)[0]);
//         if (Object.keys(changes)[0][0] == "~") {
//             console.log("ici bas");
//             chrome.action.setBadgeBackgroundColor({color : "#0fa600"});
//             chrome.action.setBadgeText({ text: 'find' });
//             setTimeout(clearBadge, 5000);
//             function clearBadge() {
//                 chrome.action.setBadgeText({ text: '' });
//             }
//         }
//     });
// });


  