console.log("content cheat log");
let port = chrome.runtime.connect({name: "from cs"});

function portCreation() {
    port = chrome.runtime.connect({name: "from cs"});
}


// the mutation observer est fire à toutes les mutations, for each, we check the url and the last url 
// it is effective => when the url change, we know it fast
// BUT it fires many many times 
<<<<<<< HEAD
let lastUrl = location.href; 
new MutationObserver((mut) => {
  const url = location.href;
    console.log(mut);
    console.count(url);
//   console.log(url, lastUrl);
  if (url !== lastUrl) {
      console.log("fire");
    lastUrl = url;
    if (url.length > 40) {
        onUrlChange();
  }
  }
}).observe(document, {subtree: true, attributes: true});
 
 
function onUrlChange() {
        // console.log("getall launch because mutation animation fired");
        getall();
}
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function findReviews() {
    let totalreview = "";
    let lastreviewlooked = 0;

    // loop until stringnumberofreviews.length = 0; or that we have 100 reviews 
    // == means that the js-show-more <a> </a> isn't display anymore 
    // == there is no other review to display 
    let loopcompteur = 0;
    // numberofreviews
    let stringnumberofreviews =  document.evaluate('//*[@class="js-show-more"]/../text()',  document, null, XPathResult.STRING_TYPE, null ).stringValue;
    while (((stringnumberofreviews.length > 0) && (loopcompteur < 10)) || (loopcompteur == 0)) 
    {
        // loopcompteur == 0 if there is less than ~ 10 reviews 
        document.querySelector(".js-show-more") ? document.querySelector(".js-show-more").click() : null; // we simulate a click to show more reviews 

        await sleep(1);
        
        const resulttotal = document.querySelectorAll("[id^=up-truncation]");
        for (let i = lastreviewlooked; i < resulttotal.length; i++) {
            const number = resulttotal[i];
            const beginindex = number.id.lastIndexOf('-') + 1;
            const numbertruncation = number.id.substring(beginindex);
            // test if review belongs to the freelancer
            const tofreelance = document.evaluate(`//*[@id="up-truncation-${numbertruncation}"]/../../../../../..//text()`, document, null, XPathResult.STRING_TYPE, null );
            if (tofreelance.stringValue.includes("reelancer") == false) {
                    totalreview += resulttotal[i].innerText.replaceAll(/\.|,|\!|\;|\:|\-/g, "").replaceAll("\n", " ") + " ";
            }
            lastreviewlooked += 1;
        }
        stringnumberofreviews =  document.evaluate('//*[@class="js-show-more"]/../text()',  document, null, XPathResult.STRING_TYPE, null ).stringValue;
        loopcompteur++;
    }
        findNames(totalreview);
}

function getall() 
{
    const observer = new MutationObserver(function (mutations) {
        let stop = false;
        let already = false;
        mutations.forEach(function (mutation) {
            // console.log(1);
            if (mutation.target.id.slice(0, 14) == 'up-truncation-') {
                stop = true; 
                if (!already) {
                    // console.log("not alreaadu")
                    findReviews();
                    already = true;
                }
=======
new MutationObserver((mut) => {
    // console.log(mut);
    mut.forEach((value) => {
        // console.log(value);
        // console.log(value.target.className);
        if (value.target.className == "question") {
         console.log("find");
         console.log(value.target);
         const question = value.target.querySelector(".questionText").innerText;
         console.log(question + "\n");
         
         
         let params = "";
         const strArray = question.split(" ");
         strArray.forEach((value) => {
             console.log(value);
            params +=  value + "+";
         });
         if (params.length > 2) {

            const url = "https://www.google.com/search?q=";
            const request = url + params;
            console.log(request); 

            port.postMessage({message : "question", req : request});
>>>>>>> 79e1e2472a75ff0b322d4d81f5c88f95876cf74f
            }
        }
    });
}).observe(document, {subtree: true, attributes: true});
 
