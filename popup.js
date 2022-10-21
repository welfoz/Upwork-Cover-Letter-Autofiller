// mixpanel
const mixpanel = require('mixpanel-browser');

mixpanel.init('79819961683bf241161266d16a1aca31', {debug: false}); 
mixpanel.track('Popup loaded');

let btnSign = document.getElementById('signature');
chrome.storage.local.get({signature}, function(sign) {
    if (Object.keys(sign.signature).length != 0) {
        btnSign.innerText = sign.signature; 
    } else {
        btnSign.innerHTML = "Looking forward to working with you. </div><div><br>Best Regards </div><div>[YOUR NAME HERE]</div>";
    }
});

let btnTemp = document.getElementById('template');
chrome.storage.local.get({template}, function(sign) {
    if (Object.keys(sign.template).length != 0) {
        btnTemp.innerText = sign.template; 
    } else {
        btnTemp.innerHTML = "To learn how to define your cover letter template. \n\nCheck out the getting started video: https://www.youtube.com/watch?v=IQzjlVIDUsk&ab_channel=UpworkExtension"
    }
});

btnSign.style.color = "grey";
btnTemp.style.color = "grey";

let btnSave = document.getElementById('signatureSaver');
btnSave.addEventListener('click', function() {
    let mysignature = document.getElementById("signature").innerText;
    chrome.storage.local.set({signature : mysignature}, function() {
        btnSave.innerHTML = btnSave.innerHTML.replace("Save ", "Saved");
        document.getElementById("signature").innerText = "";
        setTimeout(function () {
            btnSave.innerHTML = btnSave.innerHTML.replace("Saved", "Save ");
        }, 1000);
        mixpanel.track("Signature Saved", {
            "value": `${mysignature}`
        })
        currentTemplateUpdate();
    });
});

let btnSaveTemplate = document.getElementById('templateSaver');
btnSaveTemplate.addEventListener('click', function() {
    let mytemplate = document.getElementById("template").innerText;
    chrome.storage.local.set({template : mytemplate}, function() {
        btnSaveTemplate.innerHTML = btnSaveTemplate.innerHTML.replace("Save ", "Saved");
        document.getElementById("template").innerText = "";
        setTimeout(function () {
            btnSaveTemplate.innerHTML = btnSaveTemplate.innerHTML.replace("Saved", "Save ");
        }, 1000);
        mixpanel.track("Template Saved", {
            "value": `${mytemplate}`
        })
        currentTemplateUpdate();
    });
});


btnSign.addEventListener('click', function() {
    document.getElementById("signature").style.color = "black";
});

btnTemp.addEventListener('click', function() {
    document.getElementById("template").style.color = "black";
});

// let btnGetAll = document.getElementById('getAll');
// btnGetAll.addEventListener('click', function() {
//     let currentValue = btnGetAll.value;
//     if (currentValue == 'Hide') {
//         document.getElementsByClassName("resultContainer")[0].style.display = "none";
//         btnGetAll.value = "Show";
//     } else {
//         let getTemplate = "";
//         let getSign = "";
//         function tempPromise() {
//             return new Promise((resolve) => {
//                 chrome.storage.local.get({template}, function(sign) {
//                 // console.log(sign);
//                 // console.log(Object.keys(sign.signature).length);
//                 if (Object.keys(sign.template).length != 0) {
//                     getTemplate = sign.template;
//                     resolve('find');
//                 } else {
//                     resolve("nop");
//                 }
//             });
    
//             });
//         }
//         function signPromise() {
//                 return new Promise((resolve) => {
//                     chrome.storage.local.get({signature}, function(sign) {
//                     // console.log(sign);
//                     // console.log(Object.keys(sign.signature).length);
//                     if (Object.keys(sign.signature).length != 0) {
//                         getSign = sign.signature;
//                         resolve('find');
//                     } else {
//                         document.getElementById("mySignature").innerText = "No signature stored :(";
//                         resolve('nop');
//                     }
//                 });
        
//                 }); 
//         }
//         Promise.all([tempPromise(), signPromise()]).then((messages) => {
//                 document.getElementsByClassName("resultContainer")[0].style.display = "block";
//                 document.getElementById("mySignature").innerText = getTemplate + '\n\n' + getSign;
//                 btnGetAll.value = "Hide";
//                 mixpanel.track("Show Template + Sign", {
//                     "template": `${getTemplate}`,
//                     "signature": `${getSign}`
//                 })
//         });
//    }
// })
let b = document.getElementById('divSign');
let a = document.getElementById('divTemp');
let swichTemp = document.getElementById("switchTemplate");
swichTemp.addEventListener('click', function aa() {
    if (swichTemp.className == 'switch') {
        document.getElementById("switchSign").className = 'switch';
        swichTemp.className = 'switchHighlight';
        a.style.display = 'block';
        b.style.display = 'none';
        mixpanel.track("Cover Letter parts clicked");
    }
});

let switchSign = document.getElementById("switchSign");
switchSign.addEventListener('click', function aaa() {
    if (switchSign.className == 'switch') {
        document.getElementById("switchTemplate").className = 'switch';
        switchSign.className = 'switchHighlight';
        b.style.display = 'block';
        a.style.display = 'none';
        mixpanel.track("Signature parts clicked");
    }
});

// let featureRequest = document.getElementById("featureRequest");
// featureRequest.addEventListener("click", () => {
//     mixpanel.track("Feature Request Clicked");
// })

let bmac = document.getElementById("bmac");
bmac.addEventListener("click", () => {
    mixpanel.track("Buy me a Coffee Clicked");
})

let contactEmail = document.getElementById("contact");
contactEmail.addEventListener("click", () => {
    mixpanel.track("Contact Email Clicked");
})

function currentTemplateUpdate() {
        console.log('b');
        let getTemplate = "";
        let getSign = "";
        function tempPromise() {
            return new Promise((resolve) => {
                chrome.storage.local.get({template}, function(sign) {
                // console.log(sign);
                // console.log(Object.keys(sign.signature).length);
                if (Object.keys(sign.template).length != 0) {
                    getTemplate = sign.template;
                    resolve('find');
                } else {
                    resolve("nop");
                }
            });
    
            });
        }
        function signPromise() {
                return new Promise((resolve) => {
                    chrome.storage.local.get({signature}, function(sign) {
                    // console.log(sign);
                    // console.log(Object.keys(sign.signature).length);
                    if (Object.keys(sign.signature).length != 0) {
                        getSign = sign.signature;
                        resolve('find');
                    } else {
                        document.getElementById("mySignature").innerText = "No signature stored :(";
                        resolve('nop');
                    }
                });
        
                }); 
        }
        Promise.all([tempPromise(), signPromise()]).then((messages) => {
                document.getElementsByClassName("resultContainer")[0].style.display = "block";
                document.getElementById("mySignature").innerText = getTemplate + '\n\n' + getSign;
                mixpanel.track("Show Template + Sign", {
                    "template": `${getTemplate}`,
                    "signature": `${getSign}`
                })
        });
}
console.log('c');
currentTemplateUpdate();