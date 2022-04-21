console.log('background loaded');

// url submit proposal be like 
// https://www.upwork.com/ab/proposals/job/~01782731d033afed98/apply/


chrome.webNavigation.onHistoryStateUpdated.addListener(function(a) {
    console.log("webnav" + a);
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        console.log(Object.keys(changes)[0]);
        if (Object.keys(changes)[0][0] == "~") {
            console.log("ici bas");
            chrome.action.setBadgeBackgroundColor({color : "#0fa600"});
            chrome.action.setBadgeText({ text: 'find' });
            setTimeout(clearBadge, 5000);
            function clearBadge() {
                chrome.action.setBadgeText({ text: '' });
            }
        }
    });
});


  