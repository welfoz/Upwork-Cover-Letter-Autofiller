// console.log(chrome.extension.getViews());
chrome.action.setBadgeBackgroundColor(
  {color: [0, 255, 0, 0]},  // Green
  () => { /* ... */ },
);
// ecouter changement local storage 
// effacer après 2 sec 
// PRB => FONCTIONNE QUE SI LE POPUP EST ALLUME => SINON FONCTIONNE PAS 

var btnSign = document.getElementById('signature');
chrome.storage.local.get({signature}, function(sign) {

    if (Object.keys(sign.signature).length != 0) {
        btnSign.innerText = sign.signature; 

    } else {
        btnSign.innerHTML = "Looking forward to working with you. </div><div><br>Best Regards </div><div>My Beautiful Name</div>";

    }
});

btnSign.style.color = "grey";


var btn = document.getElementById('clearStorage');
btn.addEventListener('click', function() {
    // console.log("checkbutton");
    chrome.storage.local.clear();
    document.getElementById("clearStorage").value = "You're Clean !";
    setTimeout(function () {
        document.getElementById("clearStorage").value = "Clear Storage";
    }, 1000);   console.log("removed !!!!!")
});

var btnSave = document.getElementById('signatureSaver');
btnSave.addEventListener('click', function() {
    // console.log("sign saving");
    var mysignature = document.getElementById("signature").innerText;

    chrome.storage.local.set({signature : mysignature}, function() {
        // console.log(mysignature);
        document.getElementById("signatureSaver").value = "Saved !";
        document.getElementById("signature").innerText = "";
        setTimeout(function () {
            document.getElementById("signatureSaver").value = "Save";
        }, 1000);
    });
});

btnSign.addEventListener('click', function() {
    // console.log("checkbutton");

    document.getElementById("signature").style.color = "black";

});

var btnTryAgain = document.getElementById('getSignature');
btnTryAgain.addEventListener('click', function() {
    // console.log("get sign re");
    let currentValue = btnTryAgain.value;
    if (currentValue == 'Hide') {
        document.getElementsByClassName("resultContainer")[0].style.display = "none";
        btnTryAgain.value = "Show";

    } else {


    document.getElementsByClassName("resultContainer")[0].style.display = "block";
    chrome.storage.local.get({signature}, function(sign) {
        // console.log(sign);
        // console.log(Object.keys(sign.signature).length);
        if (Object.keys(sign.signature).length != 0) {
            document.getElementById("mySignature").innerText = sign.signature;
        } else {
            document.getElementById("mySignature").innerText = "No signature stored :(";

        }
        btnTryAgain.value = "Hide";
        /*setTimeout(function () {
            document.getElementById("mySignature").textContent = "";

            document.getElementsByClassName("resultContainer")[0].style.display = "none";
        }, 1000);*/
    });
}
})
/*
var btnHideSign = document.getElementById('hideSignature');
btnHideSign.addEventListener('click', function() {
    console.log("get sign re");
    document.getElementsByClassName("resultContainer")[0].style.display = "none";
})*/