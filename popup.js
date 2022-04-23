
let btnSign = document.getElementById('signature');
chrome.storage.local.get({signature}, function(sign) {

    if (Object.keys(sign.signature).length != 0) {
        btnSign.innerText = sign.signature; 

    } else {
        btnSign.innerHTML = "Looking forward to working with you. </div><div><br>Best Regards </div><div>My Beautiful Name</div>";

    }
});
let btnTemp = document.getElementById('template');
chrome.storage.local.get({template}, function(sign) {

    if (Object.keys(sign.template).length != 0) {
        btnTemp.innerText = sign.template; 

    } else {
        btnTemp.innerHTML = "I just read your posting. It sounds like you need an expert in cold emails to advise you on everything from the content to the overall strategy. <div><br>I have a background in email marketing and have been doing this for 3 years. Cold emailing in B2B is what I specialize in.</div><div><br>I can work with you to write the content and subject lines, recommend the best technologies for you to use, and more. Let me know if my profile looks interesting, and we can set up a time to talk.</div>"

    }
});


btnSign.style.color = "grey";
btnTemp.style.color = "grey";


let btn = document.getElementById('clearStorage');
btn.addEventListener('click', function() {
    // console.log("checkbutton");
    chrome.storage.local.clear();
    document.getElementById("clearStorage").value = "You're Clean !";
    setTimeout(function () {
        document.getElementById("clearStorage").value = "Clear Storage";
    }, 1000);   console.log("removed !!!!!")
});

let btnSave = document.getElementById('signatureSaver');
btnSave.addEventListener('click', function() {
    // console.log("sign saving");
    let mysignature = document.getElementById("signature").innerText;

    chrome.storage.local.set({signature : mysignature}, function() {
        // console.log(mysignature);
        document.getElementById("signatureSaver").value = "Saved !";
        document.getElementById("signature").innerText = "";
        setTimeout(function () {
            document.getElementById("signatureSaver").value = "Save";
        }, 1000);
    });
});
let btnSaveTemplate = document.getElementById('templateSaver');
btnSaveTemplate.addEventListener('click', function() {
    // console.log("sign saving");
    let mytemplate = document.getElementById("template").innerText;

    chrome.storage.local.set({template : mytemplate}, function() {
        // console.log(mysignature);
        document.getElementById("templateSaver").value = "Saved !";
        document.getElementById("template").innerText = "";
        setTimeout(function () {
            document.getElementById("templateSaver").value = "Save";
        }, 1000);
    });
});


btnSign.addEventListener('click', function() {
    // console.log("checkbutton");

    document.getElementById("signature").style.color = "black";

});
btnTemp.addEventListener('click', function() {
    // console.log("checkbutton");

    document.getElementById("template").style.color = "black";

});
let btnGetAll = document.getElementById('getAll');
btnGetAll.addEventListener('click', function() {
    // console.log("get sign re");
    let currentValue = btnGetAll.value;
    if (currentValue == 'Hide') {
        document.getElementsByClassName("resultContainer")[0].style.display = "none";
        btnGetAll.value = "Show";

    } else {

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
        console.log(messages, getTemplate, getSign);
        document.getElementById("mySignature").innerText = getTemplate + '\n\n' + getSign;
        btnGetAll.value = "Hide";
   });
   }
})

        let b = document.getElementById('divSign');
        let a = document.getElementById('divTemp');
let swichTemp = document.getElementById("switchTemplate");
swichTemp.addEventListener('click', function aa() {
    console.log('ouille');
    if (swichTemp.className == 'switch') {
        document.getElementById("switchSign").className = 'switch';
        swichTemp.className = 'switchHighlight';
        a.style.display = 'block';
        b.style.display = 'none';
    }
});
let switchSign = document.getElementById("switchSign");
switchSign.addEventListener('click', function aaa() {
    console.log('ouille');
    if (switchSign.className == 'switch') {
        document.getElementById("switchTemplate").className = 'switch';
        switchSign.className = 'switchHighlight';
        b.style.display = 'block';
        a.style.display = 'none';
    }
});
/*
let btnHideSign = document.getElementById('hideSignature');
btnHideSign.addEventListener('click', function() {
    console.log("get sign re");
    document.getElementsByClassName("resultContainer")[0].style.display = "none";
})*/


/**
 * 
 *  function MultiSwitch(props, ...children) {
        return m$1(
            "span",
            {class: ["multi-switch", props.class]},
            m$1("span", {
                class: "multi-switch__highlight",
                style: {
                    left: `${
                        (props.options.indexOf(props.value) /
                            props.options.length) *
                        100
                    }%`,
                    width: `${(1 / props.options.length) * 100}%`
                }
            }),
            props.options.map((option) =>
                m$1(
                    "span",
                    {
                        class: {
                            "multi-switch__option": true,
                            "multi-switch__option--selected":
                                option === props.value
                        },
                        onclick: () =>
                            option !== props.value && props.onChange(option)
                    },
                    option
                )
            ),
            ...children
        );
    }
 */