
var iframe = document.getElementById('myFrame');
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
let item;
function popUp(item, options, coords) {

    item = item
    $('body').append(`
            <div id="optPopup" class="popup-box" style="top:${coords.top - 70}px; left:${coords.left}px">
                <h5 class="optPopup-title">${options.title}</h5>
                <ul class="flex m-0"> </ul>
            </div> `)

    options.buttons.forEach(b => $("#optPopup ul").append(`<li> <button id="${b.id}" class="btn btn-info">${b.text}</button> </li> `))

}


function textOptions(item, options, coords) {
    const size = window.getComputedStyle(item, null).getPropertyValue('font-size');
    const color = window.getComputedStyle(item, null).getPropertyValue('color');

    const hexColor = rgbToHex(color)
    var fontSize = parseFloat(size);

    $('body').append(`
    <div id="itopts" style="top:${coords.top}px; left:${coords.left}px">
        <h4>${options.title}</h4>
        <ul>
            <li>
                <input id="color-input" type="color" value="${hexColor}" class="color-input"/>
                <label id="color-cutsom_input" for="color-input" class="custom" style="background-color:${hexColor};" ></label>
            </li>
            <li>
                <input type="range" id="range" name="range" min="6" value='${fontSize}'>
                <label for="range" id="value"></label>
            </li>
            <li>
                <label for="text">Text:</label>
                <textarea id="text" name="text" value="${$(item).text().replace(/^\s+|\s+$/g, "")}">${$(item).text().replace(/^\s+|\s+$/g, "")} </textarea>
            </li>
        </ul>
        <button id="update-text" class="btn btn-success done">Save</button>
    </div>
    `)

    //Cash font size slider 
    initSlider(fontSize)
    getinputColor()

}

function holderOptions(item, options, coords) {
    $('body').append(`
    <div id="itopts" style="top:${coords.top}px; left:${coords.left}px">
        <h4>${options.title}</h4>

        <ul>
            <li>
                <div class="tumbnialImage">
                    <input accept="image/*" type="file" id="bgIm" name="bgIm">
                    <label class="btn-3" for="bgIm"></label>
                    <img class="thum-img ">
            </div>
            </li>
        </ul>
        <button id="update-background" class="btn btn-success done">Update</button>
    </div>
    `)
}
function bnrImgOption(item, options, coords) {
    $('body').append(`
    <div id="itopts" style="top:${coords.top}px; left:${coords.left}px">
        <h4>${options.title}</h4>
        <ul>
            <li>
                <div class="tumbnialImage">
                    <input accept="image/*" type="file" id="bgIm" name="bgIm">
                    <label class="btn-3" for="bgIm"></label>
                    <img class="thum-img ">
                </div>
            </li>
        </ul>
        <button id="update-bnr-background" class="btn btn-success done">Update</button>
    </div>
    `)
}
function navOption(item, options, coords) {
    let link = item.querySelector('a')

    const size = window.getComputedStyle(link, null).getPropertyValue('font-size');
    const color = window.getComputedStyle(link, null).getPropertyValue('color');


    const hexColor = rgbToHex(color)
    var fontSize = parseFloat(size);

    $('body').append(`
    <div id="itopts" style="top:${coords.top}px; left:${coords.left}px">
    <h4>${options.title}</h4>
    <ul>
        <li>
            <input id="color-input" type="color" value="${hexColor}" class="color-input"/>
            <label id="color-cutsom_input" for="color-input" class="custom" style="background-color:${hexColor};" ></label>
        </li>
        <li>
            <input type="range" id="range" name="range" min="6" value='${fontSize}'>
            <label for="range" id="value"></label>
        </li>
    </ul>
    <button id="update-nav-link" class="btn btn-success done">Save</button>
</div>

    `)

    //Cash font size slider 
    initSlider(fontSize)
    getinputColor()
}