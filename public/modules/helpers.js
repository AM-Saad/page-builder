

function rgbToHex(color) {
    var a = color.split("(")[1].split(")")[0];
    a = a.split(",");
    var b = a.map(function (x) {                      //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length == 1) ? "0" + x : x; //Add zero if we get only one character
    });
    b = "#" + b.join("");

    return b
}




let initSlider = (value) => {
    let range = document.getElementById("range");
    document.getElementById("value").innerHTML = value;
    document.documentElement.style.setProperty("--range", value + "%");
    range.addEventListener("input", () => {
        let deg = range.value * 3.6;
        updateVar(range.value);
        updateValue(range.value);
    });
}
let updateValue = (value) => {
    document.getElementById("value").innerHTML = Math.floor(value);
}
let updateVar = (value) => {

    let base = window.getComputedStyle(document.body).getPropertyValue("--base");
    let second = window.getComputedStyle(document.body).getPropertyValue("--second");

    document.documentElement.style.setProperty("--deg", value * 3.6 + "deg");
    document.documentElement.style.setProperty("--range", value + "%");
    if (value >= 100) {
        document.documentElement.style.setProperty("--trackball", second);
    } else {
        document.documentElement.style.setProperty("--trackball", base);
    }

}




function getinputColor(e) {
    document.getElementById('color-input').addEventListener('change', function (e) {
        const val = e.target.value
        document.getElementById('color-cutsom_input').style.backgroundColor = val
    })
}



function displayEditedUnitImage(e) {
    
    let photo = e.target.files[0];  // file from input
    if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        const tumbnialImage = $(e.target).siblings('.thum-img')
        console.log(tumbnialImage);
        
        reader.onload = function (e) {
            tumbnialImage.attr('src', e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        tumbnialImage.removeClass('none')
    }
}