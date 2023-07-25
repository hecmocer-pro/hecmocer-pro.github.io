/* Start loading functions so that when they finish loading or a timeout is reached, the loading indicator is removed */
(function webInit() {

    document.body.onload = function () {
        const loadingPromises = []
        const arbitraryPatience = 2000

        loadingPromises.push(loadImages())
        loadingPromises.push(document.fonts.ready)

        const patienceTimeout = setTimeout(() => {
            finishedLoading()
        }, arbitraryPatience)

        Promise.all(loadingPromises).then((response) => {
            clearTimeout(patienceTimeout)
            finishedLoading()
        })
    }

    function loadImages() {
        return new Promise(function (resolve, reject) {
            const mainFormat = 'webp'
            const fallbackFormat = 'jpg'
            const loadedImagePromises = []

            loadedImagePromises.push(asyncLoadImage('.landing section', 'landing', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .jll', 'jll', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .wombat', 'wombat', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .composer', 'composer', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .shap', 'shap', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .babel', 'babel', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .erasmus', 'ruc', mainFormat, fallbackFormat))
            loadedImagePromises.push(asyncLoadImage('.experience .upm', 'upm', mainFormat, fallbackFormat))

            Promise.all(loadedImagePromises).then(resolve)
        })
    }

    function asyncLoadImage(containerSelector, srcUrl, format, fallbackFormat) {
        return new Promise(function (resolve, reject) {
            const container = document.querySelector(containerSelector)
            const image = new Image()
            const imageUrl = `media/${srcUrl}XL.${format}`
            const imageFallbackUrl = `media/${srcUrl}XL.${fallbackFormat}`

            image.onload = function () {
                container.style.backgroundImage = 'url(' + image.src + ')'
                resolve() // Resolve after image has loaded
            }

            /* For those browsers where the webp format is not supported */
            image.onerror = function () {
                image.src = imageFallbackUrl
            }

            image.src = imageUrl // Inits loading
        })
    }

    function finishedLoading() {
        const pageContainer = document.querySelector('#pageContainer')
        pageContainer.classList.add('loaded')
    }

})();

/* Listen to scroll so that when the user reaches the bottom, the page is shaken */
(function initBodyScrollListener() {

    document.querySelector('#scrollContainer').addEventListener('scroll', function (event) {
        const element = event.target
        if (Math.round(element.scrollHeight) - Math.round(element.scrollTop) === element.clientHeight) {
            shakePage()
        }
    })

    function shakePage() {
        window.navigator.vibrate && window.navigator.vibrate(100) // For those browser that don't support vibrate
        const pageContainer = document.querySelector('#pageContainer')
        pageContainer.classList.add('reachedBottom')
        setTimeout(() => {
            pageContainer.classList.remove('reachedBottom')
        }, 300)
    }

})();

/* Add an intersectionObserver so that when the user scrolls over a new section, a small vibration is activated  */
(function initSectionScrollObserver() {

    let options = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        threshold: 1.0
    }

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.navigator.vibrate && window.navigator.vibrate(10) // For those browser that don't support vibrate
            }
        })
    }

    const observer = new IntersectionObserver(callback, options)
    const targets = [...document.querySelectorAll('.experience section')]
    targets.push(document.querySelector('.landing'))
    targets.forEach((target) => { observer.observe(target) })

})();