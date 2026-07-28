const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    let targetX = currentX;
    let targetY = currentY;

    const moveCursor = event => {
        targetX = event.clientX;
        targetY = event.clientY;
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    const animateCursor = () => {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const hoverTargets = document.querySelectorAll(
        "a, button, .primary-button, .secondary-button, .info-card, .product-card, .timeline-item, .stat-card"
    );

    hoverTargets.forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursorGlow.style.width = "340px";
            cursorGlow.style.height = "340px";
            cursorGlow.style.opacity = ".7";
        });

        element.addEventListener("mouseleave", () => {
            cursorGlow.style.width = "260px";
            cursorGlow.style.height = "260px";
            cursorGlow.style.opacity = ".45";
        });
    });

    document.addEventListener("mousedown", () => {
        cursorGlow.style.transform = "translate(-50%, -50%) scale(.82)";
    });

    document.addEventListener("mouseup", () => {
        cursorGlow.style.transform = "translate(-50%, -50%) scale(1)";
    });

    document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursorGlow.style.opacity = ".45";
    });
}