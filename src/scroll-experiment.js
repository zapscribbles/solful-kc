let lastKnownScrollPosition = 0;
let ticking = false;

var svgObject = document.querySelector('#svg-logo');
var pageContent = document.querySelector('#page-content-container');
var svg;
var animationScrollHeight = window.innerHeight * 1.5;
var svgStartingTopValue = 25;
var logoFinishHeight = 187; // Height we expect the logo to be once it's moved into place
var logoStartHeight = svgObject.offsetHeight;
var logoFinishPadding = 10;
var logoFinishWidth = 50;
var headerHeight = 165;

var animationCompleted = false;

// console.log('window', window, 'svgObject', svgObject);

function progressAnimation(scrollPos) {
    if (animationCompleted === false) {
        var scrollPercentage = scrollPos / (svgObject.offsetHeight / 4); // How far we've scrolled in relation to the height of the SVG, represented as a percentage
        scrollPercentage = scrollPercentage <= 1 ? scrollPercentage : 1; // scrollPercentage should never exceed 1

        // Background greyscale
        // svg.querySelector('#Background').style.filter = `grayscale(${(1 - scrollPercentage) * 100}%)`;
        // svg.querySelector('#Background').style.webkitFilter = `grayscale(${(1 - scrollPercentage) * 100}%)`;
        svg.querySelector('#Background').setAttribute(
            'style',
            `filter:grayscale(${(1 - scrollPercentage) * 100}%);
        -webkit-filter:grayscale(${(1 - scrollPercentage) * 100}%);
        -moz-filter:grayscale(${(1 - scrollPercentage) * 100}%);
        -ms-filter:grayscale(${(1 - scrollPercentage) * 100}%);
        -o-filter:grayscale(${(1 - scrollPercentage) * 100}%);`,
        );

        var svgScale = 0.25 * scrollPercentage;
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

        // Once the user has scrolled far enough, start shrinking the SVG and moving it towards the top left corner
        var scrollBreakPoint = animationScrollHeight / 3;
        if (scrollPos > scrollBreakPoint) {
            var movePercentage =
                (scrollPos - scrollBreakPoint) / (animationScrollHeight - scrollBreakPoint - logoFinishHeight);

            var topValue = (1 - movePercentage) * svgStartingTopValue;
            topValue < 0 ? (topValue = 0) : null;
            svgObject.style.top = topValue + '%';

            var heightValue = logoFinishHeight + (1 - movePercentage) * (logoStartHeight - logoFinishHeight);
            heightValue < logoFinishHeight ? (heightValue = logoFinishHeight) : null;
            svgObject.style.height = heightValue + 'px';

            var widthValue = 100 - logoFinishWidth + (1 - movePercentage) * logoFinishWidth;
            widthValue < logoFinishWidth ? (widthValue = logoFinishWidth) : null;
            svgObject.style.width = widthValue + 'vw';

            var paddingValue = (1 - movePercentage) * logoFinishPadding;
            paddingValue < logoFinishPadding ? (paddingValue = logoFinishPadding) : null;
            svgObject.style.padding = paddingValue + 'px';

            // Reduce margin top of page content to give illusion of scrolling
            // var contentMarginValue = headerHeight + (animationScrollHeight - headerHeight) * (1 - scrollPercentage);
            // var contentMarginValue = animationScrollHeight * movePercentage;
            // contentMarginValue < headerHeight ? (contentMarginValue = headerHeight) : null;
            // pageContent.style.paddingTop = contentMarginValue + 'px';
        }

        if (scrollPos > animationScrollHeight - headerHeight) {
            // pageContent.style.paddingTop = headerHeight + 'px';
            // animationCompleted = true;
        }

        console.log('scrollPos', scrollPos, 'scrollPercentage', scrollPercentage);
    }
}

function onScroll() {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            progressAnimation(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
}

function svgLoaded(loadedSvg) {
    svg = loadedSvg;

    // console.log(svg);
    // Create a gap to push content down while SVG is visible (this gap will close as the user scrolls)
    console.log('animationScrollHeight', animationScrollHeight);
    pageContent.style.paddingTop = animationScrollHeight + 'px';
    // console.log(document.querySelector('#svg-gap'));
    // Sets an appropriate transform origin for shine rays
    svg.querySelector('#Shine').style['transform-origin'] = '190px 180px';
    // Set SVG to a start state
    svg.style.transform = 'scale(1) translateX(-10px)';
    svg.querySelector('#Shine').style.transform = '0';
    svgObject.style.top = svgStartingTopValue + '%';
    // Finish up
    onScroll();
    svgObject.classList.replace('opacity-0', 'opacity-100');
    document.addEventListener('scroll', onScroll);
}
