document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const updateHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("scrolled", window.scrollY > 40);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        });
    });

    const activateNavigation = () => {
        const scrollPosition =
            window.scrollY + (header ? header.offsetHeight + 150 : 150);

        let activeSection = "";

        sections.forEach(section => {
            if (
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight
            ) {
                activeSection = section.id;
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${activeSection}`) {
                link.classList.add("active");
            }
        });
    };

    activateNavigation();

    window.addEventListener("scroll", activateNavigation, {
        passive: true
    });

    const exploreButton = document.getElementById("explore-products");

    if (exploreButton) {
        exploreButton.addEventListener("click", event => {
            event.preventDefault();

            const products = document.getElementById("products");

            if (!products) {
                return;
            }

            const headerHeight = header ? header.offsetHeight : 0;

            const position =
                products.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

            const grid = document.querySelector(".product-grid");

            if (grid) {
                setTimeout(() => {
                    grid.classList.remove("pop-in");

                    void grid.offsetWidth;

                    grid.classList.add("pop-in");
                }, 450);
            }
        });
    }

    const lazyImages = document.querySelectorAll("img[data-src]");

    if (lazyImages.length) {
        const lazyObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const image = entry.target;

                    image.src = image.dataset.src;
                    image.removeAttribute("data-src");

                    lazyObserver.unobserve(image);
                });
            },
            {
                rootMargin: "200px"
            }
        );

        lazyImages.forEach(image => {
            lazyObserver.observe(image);
        });
    }

    const fadeTargets = document.querySelectorAll("[data-fade]");

    if (fadeTargets.length) {
        const fadeObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    fadeObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15
            }
        );

        fadeTargets.forEach(item => {
            fadeObserver.observe(item);
        });
    }
});