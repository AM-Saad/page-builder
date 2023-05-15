var iframe = document.getElementById('myFrame');
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;


let selecteditem;
let coords;
let itemOpt;


const editableItems = [
    {
        type: 'text',
        draggable: false,
        title: 'Change Text',
        buttons: [
            { text: 'Edit Text', id: 'showOpt', element: 'Button' },
            { text: 'Delete Text', id: 'delete-element', element: 'Button' }
        ],
    },
    {
        type: 'holder',
        draggable: true,
        title: 'Edit Container',
        buttons: [
            // { text: 'Change Background', id: 'change-background', element: 'Button' },
            { text: 'Delete Container', id: 'delete-element', element: 'Button' }
        ],
    },
    {
        type: 'bnr-img',
        draggable: false,
        title: 'Image Background',
        buttons: [
            { text: 'Change Background', id: 'showOpt', element: 'Button' },
            { text: 'Delete Item', id: 'delete-element', element: 'Button' }
        ],
    },
    {
        type: 'slider-img',
        draggable: false,
        title: 'Silder Background',
        buttons: [
            { text: 'Change Background', id: 'showOpt', element: 'Button' },
        ],
    },
    {
        type: 'top-nav',
        draggable: false,
        title: 'Edit Navigation',
        buttons: [
            { text: 'Change Text', id: 'showOpt', element: 'Button' },
        ],
    }
]



function editorEvents() {
    $(iframe.contentDocument).on('click', buttonspopup);
    $(iframe.contentDocument).on('mouseover', startHover);
    $(iframe.contentDocument).on("mouseout", endHover);
    $('body').on("click", '#showOpt', showptions);


    $('body').on("click", '#update-text', updateText);
    $('body').on("click", '#delete-element', deleteElement);
    $('body').on("click", '#update-background', updateBackground);
    $('body').on("click", '#update-bnr-background', updateBnrBackground);
    $('body').on("click", '#update-nav-link', updateNavLinks);


    $('body').on("click", '.done', closePopUp);
    $('body').on('change', '.tumbnialImage input', displayEditedUnitImage)

}


function buttonspopup(e) {
    const elm = getElement(e)
    $(iframe.contentDocument).find('.active-options').removeClass('active-options')
    $('#itopts').remove()
    $('#optPopup').remove()
    if (elm) {
        const type = $(elm).data('type')
        const options = editableItems.find(e => e.type === type)
        if (options) {
            itemOpt = options
            selecteditem = elm
            coords = getCoords(e)
            $(elm).addClass('active-options')
            popUp(elm, options, coords)
        }
    }
}

function showptions(e) {
    console.log(itemOpt);

    switch (itemOpt.type) {
        case 'text':
            textOptions(selecteditem, itemOpt, coords)
            break;
        case 'holder':
            holderOptions(selecteditem, itemOpt, coords)
            break;
        case 'bnr-img':
            bnrImgOption(selecteditem, itemOpt, coords)
            break;
        case 'slider-img':
            holderOptions(selecteditem, itemOpt, coords)
            break;
        case 'top-nav':
            navOption(selecteditem, itemOpt, coords)
            break;
        default:
            console.log(`Sorry, we are out of trying.`);
    }
    document.getElementById('optPopup').remove()

}

function updateText(e) {

    const text = $('#text').val()
    const color = $('#color-input').val()
    const fontSize = $('#range').val()

    const type = $(selecteditem).data('type')
    const elmclass = selecteditem.classList[0]
    $(selecteditem).text(text)
    $(selecteditem).css({ color: color })
    $(selecteditem).css({ fontSize: parseInt(fontSize, 10) })
    // $(similarElms).each(function () {
    //     // $(this).text(text)
    //     $(this).css({ color: color })
    //     $(this).css({ fontSize: parseInt(fontSize, 10) })
    // });
}
function updateBackground(e) {

    const file = $('#bgIm').prop("files")[0]
    const color = $('#color').val()

    //Only pics
    var picReader = new FileReader();

    //Read the image
    picReader.readAsDataURL(file);

    picReader.addEventListener('load', function (event) {
        var picFile = event.target;
        selecteditem.style.backgroundImage = `url('${picFile.result}')`;

    });

}

function updateBnrBackground(e) {

    const file = $('#bgIm').prop("files")[0]

    //Only pics
    var picReader = new FileReader();

    //Read the image
    picReader.readAsDataURL(file);

    picReader.addEventListener('load', function (event) {
        var picFile = event.target;
        const elmType = $(selecteditem).data('type')
        if (elmType == 'slider-img') {
            $(selecteditem).find('.bnr-wrap').css({ backgroundImage: `url('${picFile.result}')` })
            // selecteditem.style.backgroundImage = `url('${picFile.result}')`;

            // $(selecteditem).attr('src', picFile.result)

        } else {
            $(selecteditem).find('img').attr('src', picFile.result)
        }
    });
}
function updateNavLinks() {
    const color = $('#color-input').val()
    const fontSize = $('#range').val()
    const similarElms = $(selecteditem).find(`[data-type='nav-link'] > a`)

    $(similarElms).each(function () {
        $(this).css({ color: color })
        $(this).css({ fontSize: parseInt(fontSize, 10) })
    });
}


function getCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let windowHeight = window.innerHeight

    let top;
    let left;

    if (y > (windowHeight / 2)) {
        console.log(windowHeight / 2)
    }
    console.log(windowHeight);
    console.log(y);

    return { left: x, top: y }
}



function getElement(e) {
    e.preventDefault();
    let type = e.target.dataset.type

    if (type) {
        return e.target
    } else {
        const parentHolder = $(e.target).closest('[data-type]')[0]
        if (parentHolder) return parentHolder
    }
}



function startHover(e) {
    console.log('here');

    e.preventDefault();
    const elm = getElement(e)
    if (elm) $(elm).addClass('bordered')
}



function endHover(e) {
    e.preventDefault();
    const elm = getElement(e)
    if (elm) $(elm).removeClass('bordered')
}


function deleteElement(e) {
    $(iframe.contentDocument).find('.active-options').removeClass('active-options')
    $('#itopts').remove()
    $('#optPopup').remove()
    $(selecteditem).remove()
}



function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}


function closePopUp() {
    document.getElementById('itopts').remove()

}