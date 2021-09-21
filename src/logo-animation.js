// Need to assign this outside of the event listener - using e.target inside created weird results
var svg = document.querySelector('svg');
window.addEventListener('pointermove', e => {
    // Get the x coordinate of the mouse position as a percentage of the SVG's width
    var relativeX = e.x / svg.width.baseVal.value;
    // Translate this into a factor to multiply the transform by
    var mousePosFactor = 1 - Math.round(relativeX * 100) / 100;
    // console.log(mousePosFactor);
    // Assign the factor to the CSS variable. The CSS does the rest!
    svg.style.setProperty('--mousePosFactor', mousePosFactor);
});
