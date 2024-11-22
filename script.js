const giftTop = document.querySelector("#giftTop");
const catImage = document.querySelector("#catImage");
let animationFrameId;

// Rotation handling
let currentRotation = 0;
let targetRotation = 0;
const damping = 0.3;
const maxRotation = 90;

function updateRotation() {
    const diff = targetRotation - currentRotation;
    currentRotation += diff * damping;
    giftTop.style.transformOrigin = 'center';
    giftTop.style.transform = `rotate(${-currentRotation * 2}deg)`;
    animationFrameId = requestAnimationFrame(updateRotation);
}

// Handle basic device tilt
window.addEventListener("devicemotion", (event) => {
    targetRotation = Math.max(-maxRotation, Math.min(maxRotation,
        -event.accelerationIncludingGravity.x));
});

updateRotation();

// Initialize shake detection
const myShakeEvent = new Shake({
    threshold: 15, // shake strength threshold
    timeout: 1000,  // minimum time between shakes
    handler: shakeDetected // callback function
});
myShakeEvent.start();

// Handle shake event
function shakeDetected() {
    cancelAnimationFrame(animationFrameId);

    // Vibrate if supported
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }

    // Animate gift opening
    giftTop.style.transition = '1s ease-out';
    giftTop.style.transform = 'translateY(-100vh) rotate(-180deg)';
    catImage.style.display = 'block';
    catImage.style.transform = 'translateY(300px)';

    setTimeout(() => {
        catImage.style.transition = '1s ease-out';
        catImage.style.transform = 'translateY(0)';
    }, 10);

    // Stop listening for shakes
    myShakeEvent.stop();
}
