console.log("content cheat log");
let port = chrome.runtime.connect({name: "from cs"});

function portCreation() {
    port = chrome.runtime.connect({name: "from cs"});
}


// the mutation observer est fire à toutes les mutations, for each, we check the url and the last url 
// it is effective => when the url change, we know it fast
// BUT it fires many many times 
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
            }
        }
    });
}).observe(document, {subtree: true, attributes: true});
 
