// Global game variables
let xBat = 0.4, yBat = 0.9, wBat = 0.3, hBat = 0.02;
let xBall = 0.4, yBall = 0.02, rBall = 0.04, xDir = 1, yDir = 1, xDrift = 0.005, speed = 0.01;
let quit = false;
let balance = parseInt(sessionStorage.getItem("balance"));
let stake = 100;  // Example stake amount

function startGame() {
    // Get the game canvas and context
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawFrame() {
        if (quit) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw bat
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(xBat * canvas.width, yBat * canvas.height, wBat * canvas.width, hBat * canvas.height);

        // Draw ball
        ctx.fillStyle = "#56AEF2";
        ctx.beginPath();
        ctx.arc(xBall * canvas.width, yBall * canvas.height, rBall * canvas.width, 0, Math.PI * 2);
        ctx.fill();

        // Update ball position
        yBall += speed * yDir;
        xBall += xDrift * xDir;

        // Check collision with bat
        let xDist = Math.abs(xBall - (xBat + wBat / 2));
        let yDist = Math.abs(yBall - (yBat + hBat / 2));
        if (xDist < wBat / 2 && yDist < hBat * 1.5) {
            yDir = -1;
            xDrift = Math.random() * 0.01;
            xDir = Math.random() > 0.5 ? 1 : -1;
        }

        // Check for missed ball
        if (yBall > 1.0) {
            alert("You missed!");
            balance -= stake;
            updateBalance();
            quit = true;
        }

        // Check for random burst event
        if (Math.random() < 0.01) {  // Example: 1% chance of ball bursting
            alert("The ball burst in mid-air!");
            balance -= stake;
            updateBalance();
            quit = true;
        }

        // Update the frame if the game is still running
        if (!quit) requestAnimationFrame(drawFrame);
    }

    drawFrame();
}

// Start the game on page load
window.onload = function () {
    if (!sessionStorage.getItem("username")) {
        window.location.href = "login.html";
    } else {
        document.getElementById("balance").innerText = balance;
        startGame();
    }
};

      
