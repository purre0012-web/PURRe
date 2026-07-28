const animatedElements = document.querySelectorAll(
    ".hero-content, .hero-visual, .section-heading, .info-card, .product-card, .stat-card, .timeline-item, .future-grid div, .value-grid div, .contact-grid div"
);

const animationObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.classList.add("is-visible");

            animationObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = `opacity .8s ease ${index * 40}ms, transform .8s ease ${index * 40}ms`;

    animationObserver.observe(element);
});

const floatingItems = document.querySelectorAll(".product-card img, .hero-visual img");

floatingItems.forEach((item, index) => {
    const speed = 3500 + index * 700;
    const distance = 8 + index * 2;

    let start = performance.now();

    function animate(now) {
        const progress = (now - start) / speed;
        const offset = Math.sin(progress * Math.PI * 2) * distance;

        item.style.transform = `translateY(${offset}px)`;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});

const progressBars = document.querySelectorAll("[data-progress]");

const progressObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const value = Number(entry.target.dataset.progress) || 0;

            entry.target.style.width = `${value}%`;

            progressObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.3
    }
);

progressBars.forEach(bar => {
    bar.style.width = "0%";
    progressObserver.observe(bar);
});

const revealNumbers = document.querySelectorAll("[data-number]");

const numberObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const target = Number(entry.target.dataset.number);
            const suffix = entry.target.dataset.suffix || "";
            const duration = 1800;

            let startTime = null;

            function count(timestamp) {
                if (!startTime) {
                    startTime = timestamp;
                }

                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * target);

                entry.target.textContent = `${value}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(count);
                }
            }

            requestAnimationFrame(count);

            numberObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.35
    }
);

revealNumbers.forEach(number => {
    numberObserver.observe(number);
});