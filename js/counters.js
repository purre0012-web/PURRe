const counterElements = document.querySelectorAll("[data-counter]");

const animateCounter = element => {
    const target = Number(element.dataset.counter) || 0;
    const duration = Number(element.dataset.duration) || 1800;
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";

    let start = null;

    const update = timestamp => {
        if (!start) {
            start = timestamp;
        }

        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);

        element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
    };

    requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.35
    }
);

counterElements.forEach(counter => {
    counter.textContent = "0";
    counterObserver.observe(counter);
});