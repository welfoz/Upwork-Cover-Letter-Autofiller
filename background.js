console.log('background loaded');
let windowid;
chrome.windows.create({focused: false}, (window) => {
    console.log(window);
    windowid = window.id;
    // chrome.storage.local.set({windowId : window.id});

});

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == 'from cs') {
        port.onMessage.addListener(function(msg) {
            if (msg.message == 'question') {

                try {
                console.log(msg.req);
                // tester if windowid is active 

                chrome.windows.get(windowid, function (result) {
                    console.log(result);
                    console.log(typeof(result));
                    if (typeof(result) == "undefined") {
                        chrome.windows.create({focused: false}, (window) => {
                            console.log(window);
                            windowid = window.id;
                            chrome.tabs.create({url: msg.req, windowId: windowid}, (e) => {console.log(e)});
                        });
                    } else {
                        chrome.tabs.create({url: msg.req, windowId: windowid}, (e) => {console.log(e)});
                    } 

                });
                
                } catch (e){ 
                    console.log('err');
                    
                }
                 
            }
        })
    }
});
