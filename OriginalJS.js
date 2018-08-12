
// Browsers with webp support
var isOpera;
var isChrome;

// https://stackoverflow.com/a/9851769
(function browserDetection(){
  // Opera 8.0+
  isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Chrome 1+
  isChrome = !!window.chrome && !!window.chrome.webstore;
})();

document.body.onload = function() {
  this.loadFont('https://fonts.googleapis.com/css?family=Montserrat');
  (isChrome || isOpera) ? loadWEBPimages() : loadJPGimages();
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

function loadJPGimages() {
  this.asyncLoadImage('.landing section', 'landing', 'jpg');
  this.asyncLoadImage('.experience .jll', 'jll', 'jpg');
  this.asyncLoadImage('.experience .wombat', 'wombat', 'jpg');
  this.asyncLoadImage('.experience .composer', 'composer', 'jpg');
  this.asyncLoadImage('.experience .shap', 'shap', 'jpg');
  this.asyncLoadImage('.experience .babel', 'babel', 'jpg');
  this.asyncLoadImage('.experience .erasmus', 'ruc', 'jpg');
  this.asyncLoadImage('.experience .upm', 'upm', 'jpg');	
}

function loadWEBPimages() {
  this.asyncLoadImage('.landing section', 'landing', 'webp');
  this.asyncLoadImage('.experience .jll', 'jll', 'webp');
  this.asyncLoadImage('.experience .wombat', 'wombat', 'webp');
  this.asyncLoadImage('.experience .composer', 'composer', 'webp');
  this.asyncLoadImage('.experience .shap', 'shap', 'webp');
  this.asyncLoadImage('.experience .babel', 'babel', 'webp');
  this.asyncLoadImage('.experience .erasmus', 'ruc', 'webp');
  this.asyncLoadImage('.experience .upm', 'upm', 'webp');
}

function asyncLoadImage(containerSelector, imageUrl, format) {
  const container = document.querySelector(containerSelector);
  const lowRes = new Image();
  const hiRes = new Image();
  const lowResUrl = `media/${imageUrl}XS.${format}`;
  const hiResUrl = `media/${imageUrl}XL.${format}`;
  lowRes.onload = function(){
    container.style.backgroundImage = 'url(' + lowRes.src + ')';
    hiRes.src = hiResUrl;
  };
  hiRes.onload = function() {
    container.style.backgroundImage = 'url(' + hiRes.src + ')';
  }
  lowRes.src = lowResUrl;
}