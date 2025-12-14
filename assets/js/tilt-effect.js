export const initTiltEffect = () => {
    // Removed 'article' to prevent the whole page from tilting, which feels weird when scrolling
    const cards = document.querySelectorAll('.sidebar, .content-card, .service-item, .coding-profile-item, .project-img-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleHover);
        card.addEventListener('mouseleave', resetStyles);
    });
};

function handleHover(e) {
    const card = this;

    // Performance: Use requestAnimationFrame to avoid jank
    requestAnimationFrame(() => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Reduced tilt range for a more subtle, premium feel (was 10)
        const tiltX = (0.5 - y) * 3; // Tilt up/down
        const tiltY = (x - 0.5) * 3; // Tilt left/right

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
}

function resetStyles(e) {
    // Reset immediately
    this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
}
