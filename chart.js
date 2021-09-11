// ArrayToDraw = 2d array, with the first value being the x and the second being the y
function drawChart(startYPosition, startXPosition, ArrayToDraw, sCanvasId, sColour, iWidth) {
    // drawLine(0, 0, 100,100, sCanvasId, "black", 1);

    const CanvWidth = document.getElementById(sCanvasId).offsetWidth;
    const CanvHeight = document.getElementById(sCanvasId).offsetHeight;

    // creates these 2 arrays, byY is only used to get scale.
    const SortedArray = [...ArrayToDraw].sort(compareByX);
    const SortedArrayByY = [...ArrayToDraw].sort(compareByY).reverse();
    
    const XScale = CanvWidth / parseInt(SortedArray[SortedArray.length - 1][0]);
    const YScale = CanvHeight / parseInt(SortedArrayByY[0][1]);

    // loop through and actually draw
    for (let i = 0; i < SortedArray.length; i++) {
        // gets start X and Y
        let startY = -1;
        let startX = -1;
        if (i == 0) {
            // first item, so can't index by i-1 as that would be 0, so use user inputed start and end
            startX = startXPosition;
            startY = startYPosition;
        } else {
            // can index by i-1 as it is not first item
            startX = parseInt(SortedArray[i - 1][0]);
            startY = parseInt(SortedArray[i - 1][1]);
        }

        // accounts for scale, so values can be bugger or smaller than the canvas width, and still fit on screen
        startX = parseInt(startX) * XScale;
        startY = CanvHeight - parseInt(startY) * YScale; // does [CanvHeight - ] to make y = 0 be at the bottom, not top.

        let endX = parseInt(SortedArray[i][0]) * XScale;
        let endY = CanvHeight - parseInt(SortedArray[i][1]) * YScale;

        drawLine(startX, startY, endX, endY, sCanvasId, sColour, iWidth);
    }
}

function drawLine(iStartX, iStartY, iEndX, iEndY, sCanvasId, sColour, nWidth) {
    const canvas = document.getElementById(sCanvasId);
    
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = sColour;
    ctx.lineWidth = nWidth;

    ctx.beginPath();
    ctx.moveTo(iStartX, iStartY);
    ctx.lineTo(iEndX, iEndY);
    ctx.stroke();
}

function compareByX(a, b) {
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[0] > b[0]) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

function compareByY(a, b) {
    if (a[1] < b[1]) {
    return -1;
    }
    if (a[1] > b[1]) {
    return 1;
    }
    // a must be equal to b
    return 0;
}