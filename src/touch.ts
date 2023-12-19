/*
 * Module for handling touch events.
 */

export {
    configureElementBounds,
    configureTouchHandlers,
    appTouchStartHandler,
    touchEnded
};


// flag for blocking touch handling when an event is being handled
let fTouchRunning = false;

let leftHandler: Handler | null = null;
let rightHandler: Handler | null = null;

let leftRect: DOMRect | null = null;
let rightRect: DOMRect | null = null;

type Handler = () => void;


function configureTouchHandlers(left: Handler, right: Handler): void {
    leftHandler = left;
    rightHandler = right;
}


function configureElementBounds(left: Element, right: Element): void {
    leftRect = left.getBoundingClientRect();
    rightRect = right.getBoundingClientRect();
}

function inLeft(x: number, y: number): boolean {
    if (x > leftRect.left && x < leftRect.right) {
        if (y > leftRect.top && y < leftRect.bottom) {
            return true;
        }
    }

    return false;
}

function inRight(x: number, y: number): boolean {
    if (x > rightRect.left && x < rightRect.right) {
        if (y > rightRect.top && y < rightRect.bottom) {
            return true;
        }
    }

    return false;
}

function touchStarted() {
    fTouchRunning = true;
}

function touchEnded() {
    fTouchRunning = false;
}


function appTouchStartHandler(event: TouchEvent): void {
    event.preventDefault();

    if (! fTouchRunning) {
        const touches = event.touches;

        let leftCount = 0;
        let rightCount = 0;

        for (let i = 0; i < touches.length; ++i) {
            const touch = touches.item(i);

            const [x, y] = [touch.pageX, touch.pageY];

            // log(`touches[${i}]: (${x}, ${y}) - inLeft: ${inLeft(x, y)} - inRight: ${inRight(x, y)}}`);
            if (inLeft(x, y)) {
                leftCount++;
            }
            else if (inRight(x,y)) {
               rightCount++;
            }
        }

        if (leftCount > rightCount) {
            touchStarted();
            leftHandler();
        } else if (rightCount > leftCount) {
            touchStarted();
            rightHandler();
        }
    }
}
