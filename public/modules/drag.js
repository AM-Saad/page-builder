var iframe = document.getElementById('myFrame');
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

function draggableEl() {
    const holders = iframe.contentDocument.getElementsByClassName('holder')
    for (var i = 0; i < holders.length; i++) {

        holders[i].setAttribute('draggable', true)

        holders[i].addEventListener('dragstart', handleDragStart, false);
        holders[i].addEventListener('dragover', handleDragOver, false);
        holders[i].addEventListener('dragenter', handleDragEnter, false);
        holders[i].addEventListener('dragleave', handleDragLeave, false);
        holders[i].addEventListener('dragend', handleDragEnd, false);
        holders[i].addEventListener('drop', handleDrop, false);
    }
}


function handleDragStart(e) {
    this.style.opacity = '0.8';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    // console.log();

    // holders.forEach(function (handle) {
    //     handle.classList.remove('over');
    // });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
}
