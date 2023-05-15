var iframe = document.getElementById('myFrame');
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;


window.onload = function () {
  
    checkIframeLoaded()
};
function checkIframeLoaded() {
    // Get a handle to the iframe element

    // Check if loading is complete
    if (iframeDoc.readyState == 'complete') {
        //iframe.contentWindow.alert("Hello");
        iframe.contentWindow.onload = function () { };
        // The loading is complete, call the function we want executed once the iframe is loaded
        startEditor();
        return;
    }

    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(checkIframeLoaded, 100);
}



function startEditor() {
    draggableEl()
    editorEvents()

}


