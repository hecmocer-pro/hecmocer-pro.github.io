// Browsers with webp support
var isOpera;
var isChrome;

// https://stackoverflow.com/a/9851769
(function browserDetection() {
    // Opera 8.0+
    isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Chrome 1+
    isChrome = !!window.chrome && !!window.chrome.webstore;
})();

document.body.onload = function () {
    this.loadFont('https://fonts.googleapis.com/css?family=Montserrat');
    (isChrome || isOpera) ? loadWEBPimages() : loadJPGimages();
    window.navigator.vibrate(10)
}

function loadFont(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var style = document.createElement('style');
            style.innerHTML = xhr.responseText;
            document.head.appendChild(style);
        }
    };
    xhr.send();
}

function loadedLandingImage() {
    const pageContainer = document.querySelector('#pageContainer')
    pageContainer.classList.add('loaded')
}

function shakePage() {
    const pageContainer = document.querySelector('#pageContainer')
    pageContainer.classList.add('reachedBottom')
    setTimeout(() => {
        pageContainer.classList.remove('reachedBottom')
    }, 300)
}


function loadJPGimages() {
    asyncLoadImage('.landing section', 'landing', 'jpg').then(loadedLandingImage);
    asyncLoadImage('.experience .jll', 'jll', 'jpg');
    asyncLoadImage('.experience .wombat', 'wombat', 'jpg');
    asyncLoadImage('.experience .composer', 'composer', 'jpg');
    asyncLoadImage('.experience .shap', 'shap', 'jpg');
    asyncLoadImage('.experience .babel', 'babel', 'jpg');
    asyncLoadImage('.experience .erasmus', 'ruc', 'jpg');
    asyncLoadImage('.experience .upm', 'upm', 'jpg');
}

function loadWEBPimages() {
    asyncLoadImage('.landing section', 'landing', 'webp').then(loadedLandingImage);
    asyncLoadImage('.experience .jll', 'jll', 'webp');
    asyncLoadImage('.experience .wombat', 'wombat', 'webp');
    asyncLoadImage('.experience .composer', 'composer', 'webp');
    asyncLoadImage('.experience .shap', 'shap', 'webp');
    asyncLoadImage('.experience .babel', 'babel', 'webp');
    asyncLoadImage('.experience .erasmus', 'ruc', 'webp');
    asyncLoadImage('.experience .upm', 'upm', 'webp');
}

function asyncLoadImage(containerSelector, imageUrl, format) {
    return new Promise(function (resolve, reject) {
        const container = document.querySelector(containerSelector);
        const lowRes = new Image();
        const hiRes = new Image();
        const lowResUrl = `media/${imageUrl}XS.${format}`;
        const hiResUrl = `media/${imageUrl}XL.${format}`;
        lowRes.onload = function () {
            container.style.backgroundImage = 'url(' + lowRes.src + ')';
            hiRes.src = hiResUrl;
        };
        hiRes.onload = function () {
            container.style.backgroundImage = 'url(' + hiRes.src + ')';
            resolve()
        }
        lowRes.src = lowResUrl;
    })
}

document.querySelector('#scrollContainer').addEventListener('scroll', function (event) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        shakePage()
    }
});