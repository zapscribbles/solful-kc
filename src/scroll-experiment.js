let lastKnownScrollPosition = 0;
let ticking = false;

var svgObject = document.querySelector('#svg-logo');
// var svg = svgObject.contentDocument.querySelector('svg')
var svg;

console.log(window, svgObject, svg);

function progressAnimation(scrollPos, windowHeight) {
    // Do something with the scroll position
    var scrollPercentage = scrollPos / (svgObject.offsetHeight / 4); // How far we've scrolled in relation to the height of the SVG, represented as a percentage
    scrollPercentage = scrollPercentage <= 1 ? scrollPercentage : 1; // scrollPercentage should never exceed 1

    // Background greyscale
    svg.querySelector('#Background').style.filter = `grayscale(${(1 - scrollPercentage) * 100}%)`;

    var svgScale = 0.3 * scrollPercentage;
    svg.style.transform = 'scale(' + (1 + svgScale) + ') translateX(-10px)';

    // Rotate and scale shine
    svg.querySelector('#Shine').style.transform = `rotate(${scrollPos / 4}deg) scale(${scrollPercentage})`;

    // Offset text
    var maxTextOffset = -5;
    var textOffset = scrollPercentage <= 1 ? maxTextOffset * (1 - scrollPercentage) : 0;
    svg.querySelector('#Text').style.transform = 'translateX(' + textOffset + 'px)';

    // Offset text shadow
    var maxTextShadowOffsetX = -10;
    var maxTextShadowOffsetY = -4;
    var textShadowOffsetX = scrollPercentage <= 1 ? maxTextShadowOffsetX * (1 - scrollPercentage) : 0;
    var textShadowOffsetY = scrollPercentage <= 1 ? maxTextShadowOffsetY * (1 - scrollPercentage) : 0;
    svg.querySelector('#TextShadow').style.transform = `translate(${textShadowOffsetX}px, ${textShadowOffsetY}px)`;

    // Offset subtitle shadow
    var maxSubtitleShadowOffsetX = -1.2;
    var maxSubtitleShadowOffsetY = -1.2;
    var subtitleShadowOffsetX = scrollPercentage <= 1 ? maxSubtitleShadowOffsetX * (1 - scrollPercentage) : 0;
    var subtitleShadowOffsetY = scrollPercentage <= 1 ? maxSubtitleShadowOffsetY * (1 - scrollPercentage) : 0;
    svg.querySelector(
        '#SubtitleShadow',
    ).style.transform = `translate(${subtitleShadowOffsetX}px, ${subtitleShadowOffsetY}px)`;

    // console.log(scrollPos, svgObject.offsetHeight, scrollPercentage, textOffset);
}

document.addEventListener('scroll', function (e) {
    lastKnownScrollPosition = window.scrollY;
    windowHeight = window.innerHeight;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            progressAnimation(lastKnownScrollPosition, windowHeight);
            ticking = false;
        });

        ticking = true;
    }
});

function svgLoaded(loadedSvg) {
    svg = loadedSvg;
    // Create a gap to push content down while SVG is visible (this gap will close as the user scrolls)
    document.querySelector('#svg-gap').style.height = screen.innerHeight + 'px';
    // Sets an appropriate transform origin for shine rays
    console.log(svg);
    svg.querySelector('#Shine').style['transform-origin'] = '190px 180px';
    // Set SVG to a start state
    svg.style.transform = 'scale(1) translateX(-10px)';
    svg.querySelector('#Shine').style.transform = '0';
    progressAnimation(0, 1);
}
